import { AlertCircle } from "lucide-react";
import { Text } from "./Text";

export const ErrorComponent = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <Text as="p" style="text-red-600 font-medium mb-2">
        {error
          ? error == "Cannot read properties of null (reading 'service')"
            ? "Service coming soon"
            : error
          : "Oops! Something went wrong"}
      </Text>
      {/* <Text as='p' style='text-gray-600 text-sm'>
        {error}
      </Text> */}
    </div>
  );
};
