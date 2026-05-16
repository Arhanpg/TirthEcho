export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateMobileNumber(mobile: string): boolean {
  // Indian mobile number format: 10 digits
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile.replace(/\D/g, ''));
}

export function validateStrongPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function validatePaginationParams(page: any, pageSize: any) {
  const pageNum = parseInt(page) || 1;
  const size = parseInt(pageSize) || 20;

  if (pageNum < 1) return { page: 1, pageSize: size };
  if (size < 1 || size > 100) return { page: pageNum, pageSize: 20 };

  return { page: pageNum, pageSize: size };
}

export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}
