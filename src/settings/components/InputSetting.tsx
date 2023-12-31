import { Input, FormControl, FormLabel } from "@chakra-ui/react";

interface Props {
  value: string;
  label: string;
}
export const InputSetting = ({ value, label }: Props) => {
  return (
    <div>
      <FormControl className="mb-10">
        <FormLabel className=" text-[#FF5050]">{label}</FormLabel>
        <Input variant="settings" value={value} />
      </FormControl>
    </div>
  );
};
