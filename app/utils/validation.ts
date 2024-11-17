import { z } from "zod";

type fieldErrrors = { [key: string]: string };

export function validateForm<T>(
  formData: FormData,
  zodSchema: z.Schema<T>,
  successFN: (data: T) => unknown,
  errorFn: (errors: fieldErrrors) => unknown
) {
  const result = zodSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    const errors: fieldErrrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });

    return errorFn(errors);
  }
  return successFN(result.data);
}
