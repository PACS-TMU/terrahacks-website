import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";

type InputFieldProps = {
  htmlFor: string;
  fieldTitle: string;
  fieldType: string;
  fieldId: string;
  fieldName: string;
  fieldPlaceholder: string;
  fieldRequired: boolean;
  fieldAutocomplete: string;
  fieldPattern?: string;
};

export default function InputField({
  htmlFor,
  fieldTitle,
  fieldType,
  fieldId,
  fieldName,
  fieldPlaceholder,
  fieldRequired,
  fieldAutocomplete,
}: InputFieldProps) 
{
  return (
    <div className="flex flex-col gap-y-2 mb-4">
      <Label htmlFor={htmlFor} className="tex-sm md:text-base lg:text-xl pl-1">
        {fieldTitle} <span className="text-red-500">{fieldRequired ? "*" : ""}</span>
      </Label>
      <Input
        type={fieldType}
        id={fieldId}
        name={fieldName}
        placeholder={fieldPlaceholder}
        required={fieldRequired}
        autoComplete={fieldAutocomplete}
      />
    </div>
  );
}
