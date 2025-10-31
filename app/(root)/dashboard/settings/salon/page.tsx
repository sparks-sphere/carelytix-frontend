import BranchSettingsTable from '@/components/dashboard/settings/BranchSettingsTable';
import SalonSettingsTable from '@/components/dashboard/settings/SalonSettingsTable';

export default function SalonSettings() {
  return (
    <div className="w-[1269.01px] h-[723px] top-[100px] left-[425.99px] rounded-[9.31px] border-[0.56px] border-black ">
    <div className="container space-y-6 ">
      <SalonSettingsTable />
      <BranchSettingsTable />
    </div>
    </div>
  );
}
