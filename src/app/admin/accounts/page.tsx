"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { motion } from "framer-motion";

interface Account {
  id: string;
  name: string;
  account_type: string;
  is_active: boolean;
}

interface Balance {
  amount: number;
  currency: string;
  error?: string;
}

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: number | string;
  description: string;
}

export default function AdminAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [balances, setBalances] = useState<Record<string, Balance>>({});
  const [transactions, setTransactions] = useState<
    Record<string, Transaction[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [withdrawAccount, setWithdrawAccount] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchAccounts = async () => {
      try {
        // FIXED: URL should be /accounts/ based on backend router configuration
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/accounts/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setAccounts(data);
          // Fetch balances for each account
          data.forEach((acc: Account) => fetchBalance(acc.id));
        }
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const fetchBalance = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      // FIXED: URL should be /accounts/
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/balance/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setBalances((prev) => ({ ...prev, [id]: data }));
      }
    } catch (error) {
      console.error(`Failed to fetch balance for ${id}`, error);
    }
  };

  const fetchTransactions = async (id: string) => {
    if (transactions[id]) {
      setSelectedAccount(id);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      // FIXED: URL should be /accounts/
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/transactions/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTransactions((prev) => ({ ...prev, [id]: data }));
          setSelectedAccount(id);
        } else {
          alert(data.error || "Failed to fetch transactions");
        }
      }
    } catch (error) {
      console.error(`Failed to fetch transactions for ${id}`, error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "mpesa":
        return "📱";
      case "paybill":
        return "📱";
      case "paypal":
        return "🅿️";
      case "card":
        return "💳";
      case "bank":
        return "🏦";
      default:
        return "💰";
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payment Accounts</h1>
        <Link
          href="/admin/accounts/new"
          className="bg-[#00b17b] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#009e6d] transition-all shadow-md hover:shadow-lg"
        >
          + Add Account
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading accounts...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl bg-gray-50 p-2 rounded-lg">
                    {getIcon(account.account_type)}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-800">{account.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {account.account_type}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    account.is_active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {account.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Available Balance</p>
                {balances[account.id] ? (
                  balances[account.id].error ? (
                    <p className="text-red-500 text-sm">
                      {balances[account.id].error}
                    </p>
                  ) : (
                    <p className="text-3xl font-bold text-[#00b17b]">
                      {balances[account.id].currency}{" "}
                      {balances[account.id].amount.toLocaleString()}
                    </p>
                  )
                ) : (
                  <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => fetchTransactions(account.id)}
                  className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Transactions
                </button>
                <button
                  onClick={() => setWithdrawAccount(account.id)}
                  className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Transactions Modal */}
      {selectedAccount && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAccount(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Recent Transactions</h3>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              {transactions[selectedAccount] &&
              transactions[selectedAccount].length > 0 ? (
                <div className="space-y-4">
                  {transactions[selectedAccount].map((t) => (
                    <div
                      key={t.id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {t.description || "Transaction"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(t.created).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            t.amount > 0 ? "text-green-600" : "text-gray-800"
                          }`}
                        >
                          {t.currency.toUpperCase()} {t.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {t.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No recent transactions found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={!!withdrawAccount}
        onClose={() => setWithdrawAccount(null)}
        account={accounts.find((a) => a.id === withdrawAccount) || null}
      />
    </AdminLayout>
  );
}

function WithdrawModal({
  isOpen,
  onClose,
  account,
}: {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
}) {
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !account) return null;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/${account.id}/withdraw/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: parseFloat(amount), destination }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Withdrawal initiated successfully!");
        onClose();
      } else {
        alert(data.error || "Withdrawal failed");
      }
    } catch (error) {
      console.error("Withdrawal error", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold">Withdraw Funds</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleWithdraw} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b17b]"
              placeholder="0.00"
            />
          </div>

          {account.account_type !== "card" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination{" "}
                {account.account_type === "mpesa" ||
                account.account_type === "paybill"
                  ? "(Phone Number)"
                  : "(Email)"}
              </label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b17b]"
                placeholder={
                  account.account_type === "mpesa" ||
                  account.account_type === "paybill"
                    ? "2547..."
                    : "email@example.com"
                }
              />
            </div>
          )}

          {account.account_type === "card" && (
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              Funds will be paid out to the default bank account connected to
              your Stripe account.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00b17b] text-white py-3 rounded-xl font-bold hover:bg-[#009e6d] transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Withdrawal"}
          </button>
        </form>
      </div>
    </div>
  );
}
