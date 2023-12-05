import { CreateToastProps } from '../../src/Toast';
import { ToastAccessor } from '../../src/provider/Provider';

export const showToast = (toast: CreateToastProps) =>
  ToastAccessor.show({ ...toast, animated: true });
