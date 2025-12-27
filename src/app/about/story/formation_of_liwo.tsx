import { FC, useState } from "react";

export interface IFormationOfLIWOProps {}

export const FormationOfLIWO: FC<IFormationOfLIWOProps> = (props) => {
  return (
    <div>
      <h4 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-2">
        Formation of LIWO :
      </h4>
      <p>
        It was realized that relying on hosting the Madrasa in the garages of a
        Government owned Estate was not sustainable. The occupiers of those
        garages who were public servants could be transferred anytime and the
        new occupiers might not be as cooperative.
      </p>
      <p className="mt-4">
        To this end, Langata Islamic Welfare Organisation (LIWO) was established
        with the cardinal purpose of seeking a more secure place to host the
        Madrasa as well as dealing with all matters pertaining to Islam.
        Membership comprised both the old and young. Although the application
        for registration was lodged immediately, LIWO was eventually issued with
        the Certificate on 11th August 2009 after several of the interim
        officials underwent thorough vetting and interrogation by the Government
        security agencies.
      </p>
      <p className="mt-4">
        Prior to and after the registration, meetings were being held literally
        every weekend in the Madrasa to plot how to achieve the intended goals.
        Attendance was always house full, indicating how eager the members were
        in getting a solution.
      </p>
    </div>
  );
};
