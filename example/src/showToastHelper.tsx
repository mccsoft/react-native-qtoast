import { CommonToastProps } from '../../src/Toast';
import { ToastAccessor } from '../../src/provider/Provider';

export const showToast = (toast: CommonToastProps) => ToastAccessor.show(toast);
