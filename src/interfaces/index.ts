export interface IUser {
  _id: string;
  phone: string;
  city: string;
  bloodType: string;
  healthPlan: string;
  cpf: string;
  emergencyPhone: string;
  allergic: string;
  motorcycle: string;
  licensePlate: string;
  admin: boolean;
  approved: boolean;
  blocked: boolean;
  validity: string;
  passwordReseted: boolean;
  token: string;
  fcmToken: string,
  name: string;
  email: string;
  uriProfile: string;
}

export interface IUserBlock {
  _id: string;
  blocked: boolean;
  message?: string;
}

export interface IAdminContext {
  pendingUsers: IUser[];
  allUsers: IUser[];
  loading: boolean;
  loadingStorage: boolean;
  refreshing: boolean;
  storagePendingUsers: (users: IUser[]) => void;
  approveRegistration: (userId: string) => Promise<void>;
  blockUser: ({_id, blocked, message}: IUserBlock) => Promise<void>;
  makeUserAdmin: (userId: string, admin: boolean) => Promise<void>;
  refreshPendingApproval: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export interface IAuthContext {
  signed: boolean;
  useFingerPrint: boolean;
  user: IUser;
  loading: boolean;
  loadingAuth: boolean;
  loadingStorage: boolean;
  updateFields: (fields: any) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, fcmToken: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  changePassword: (password: string, confirmPassword: string) => Promise<boolean>;
  resetPasswordByEmail: (email: string) => Promise<void>;
  setUseFingerPrint: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface ISocketIOContext {
  usersPendingApprove: IUser[];
  fcmToken: IUser;
  setUsersPendingApprove: React.Dispatch<React.SetStateAction<IUser[]>>;
  setFcmToken: React.Dispatch<React.SetStateAction<IUser>>;
}
