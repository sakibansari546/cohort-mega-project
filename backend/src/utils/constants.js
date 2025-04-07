export const UserRoleEnum = {
  ADMIN: "admin",
  PROJECt_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvailableUserRole = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);

export const UserDataSelectedFeilds =
  "_id avatar username email role fullname isEmailVerified refreshToken createdAt updatedAt";
// export { UserRoleEnum, AvailableUserRole, TaskStatusEnum, AvailableTaskStatus };
