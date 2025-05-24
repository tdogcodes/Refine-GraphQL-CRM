import type * as Types from "./schema.types";

export type UpdateUserMutationVariables = Types.Exact<{
  input: Types.UpdateOneUserInput;
}>;

export type UpdateUserMutation = {
  updateOneUser: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    email: string;
    phone?: string | null;
    jobTitle?: string | null;
  };
};

export type CreateCompanyMutationVariables = Types.Exact<{
  input: Types.CreateOneCompanyInput;
}>;

export type CreateCompanyMutation = {
  createOneCompany: { id: string; salesOwner: { id: string } };
};

export type UpdateCompanyMutationVariables = Types.Exact<{
  input: Types.UpdateOneCompanyInput;
}>;

export type UpdateCompanyMutation = {
  updateOneCompany: {
    id: string;
    name: string;
    totalRevenue?: number | null;
    industry?: Types.Industry | null;
    companySize?: Types.CompanySize | null;
    businessType?: Types.BusinessType | null;
    country?: string | null;
    website?: string | null;
    avatarUrl?: string | null;
    salesOwner: { id: string; name: string; avatarUrl?: string | null };
  };
};

export type UpdateTaskStageMutationVariables = Types.Exact<{
  input: Types.UpdateOneTaskInput;
}>;

export type UpdateTaskStageMutation = { updateOneTask: { id: string } };

export type CreateTaskMutationVariables = Types.Exact<{
  input: Types.CreateOneTaskInput;
}>;

export type CreateTaskMutation = {
  createOneTask: {
    id: string;
    title: string;
    stage?: { id: string; title: string } | null;
  };
};

export type UpdateTaskMutationVariables = Types.Exact<{
  input: Types.UpdateOneTaskInput;
}>;

export type UpdateTaskMutation = {
  updateOneTask: {
    id: string;
    title: string;
    completed: boolean;
    description?: string | null;
    dueDate?: any | null;
    stage?: { id: string; title: string } | null;
    users: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    checklist: Array<{ title: string; checked: boolean }>;
  };
};

export type DashboardTotalCountsQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type DashboardTotalCountsQuery = {
  companies: { totalCount: number };
  contacts: { totalCount: number };
  deals: { totalCount: number };
};

export type DashboardCalendarUpcomingEventsQueryVariables = Types.Exact<{
  filter: Types.EventFilter;
  sorting?: Types.InputMaybe<Array<Types.EventSort> | Types.EventSort>;
  paging: Types.OffsetPaging;
}>;

export type DashboardCalendarUpcomingEventsQuery = {
  events: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      color: string;
      startDate: any;
      endDate: any;
    }>;
  };
};

export type DashboardDealsChartQueryVariables = Types.Exact<{
  filter: Types.DealStageFilter;
  sorting?: Types.InputMaybe<Array<Types.DealStageSort> | Types.DealStageSort>;
  paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardDealsChartQuery = {
  dealStages: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      dealsAggregate: Array<{
        groupBy?: {
          closeDateMonth?: number | null;
          closeDateYear?: number | null;
        } | null;
        sum?: { value?: number | null } | null;
      }>;
    }>;
  };
};

export type DashboardLatestActivitiesDealsQueryVariables = Types.Exact<{
  filter: Types.DealFilter;
  sorting?: Types.InputMaybe<Array<Types.DealSort> | Types.DealSort>;
  paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardLatestActivitiesDealsQuery = {
  deals: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      createdAt: any;
      stage?: { id: string; title: string } | null;
      company: { id: string; name: string; avatarUrl?: string | null };
    }>;
  };
};

export type DashboardLatestActivitiesAuditsQueryVariables = Types.Exact<{
  filter: Types.AuditFilter;
  sorting?: Types.InputMaybe<Array<Types.AuditSort> | Types.AuditSort>;
  paging?: Types.InputMaybe<Types.OffsetPaging>;
}>;

export type DashboardLatestActivitiesAuditsQuery = {
  audits: {
    totalCount: number;
    nodes: Array<{
      id: string;
      action: string;
      targetEntity: string;
      targetId: number;
      createdAt: any;
      changes: Array<{
        field: string;
        from?: string | null;
        to?: string | null;
      }>;
      user?: { id: string; name: string; avatarUrl?: string | null } | null;
    }>;
  };
};

export type CompaniesListQueryVariables = Types.Exact<{
  filter: Types.CompanyFilter;
  sorting?: Types.InputMaybe<Array<Types.CompanySort> | Types.CompanySort>;
  paging: Types.OffsetPaging;
}>;

export type CompaniesListQuery = {
  companies: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      avatarUrl?: string | null;
      dealsAggregate: Array<{ sum?: { value?: number | null } | null }>;
    }>;
  };
};

export type UsersSelectQueryVariables = Types.Exact<{
  filter: Types.UserFilter;
  sorting?: Types.InputMaybe<Array<Types.UserSort> | Types.UserSort>;
  paging: Types.OffsetPaging;
}>;

export type UsersSelectQuery = {
  users: {
    totalCount: number;
    nodes: Array<{ id: string; name: string; avatarUrl?: string | null }>;
  };
};

export type CompanyContactsTableQueryVariables = Types.Exact<{
  filter: Types.ContactFilter;
  sorting?: Types.InputMaybe<Array<Types.ContactSort> | Types.ContactSort>;
  paging: Types.OffsetPaging;
}>;

export type CompanyContactsTableQuery = {
  contacts: {
    totalCount: number;
    nodes: Array<{
      id: string;
      name: string;
      avatarUrl?: string | null;
      jobTitle?: string | null;
      email: string;
      phone?: string | null;
      status: Types.ContactStatus;
    }>;
  };
};

export type TaskStagesQueryVariables = Types.Exact<{
  filter: Types.TaskStageFilter;
  sorting?: Types.InputMaybe<Array<Types.TaskStageSort> | Types.TaskStageSort>;
  paging: Types.OffsetPaging;
}>;

export type TaskStagesQuery = {
  taskStages: {
    totalCount: number;
    nodes: Array<{ id: string; title: string }>;
  };
};

export type TasksQueryVariables = Types.Exact<{
  filter: Types.TaskFilter;
  sorting?: Types.InputMaybe<Array<Types.TaskSort> | Types.TaskSort>;
  paging: Types.OffsetPaging;
}>;

export type TasksQuery = {
  tasks: {
    totalCount: number;
    nodes: Array<{
      id: string;
      title: string;
      description?: string | null;
      dueDate?: any | null;
      completed: boolean;
      stageId?: string | null;
      createdAt: any;
      updatedAt: any;
      users: Array<{ id: string; name: string; avatarUrl?: string | null }>;
    }>;
  };
};

export type TaskStagesSelectQueryVariables = Types.Exact<{
  filter: Types.TaskStageFilter;
  sorting?: Types.InputMaybe<Array<Types.TaskStageSort> | Types.TaskStageSort>;
  paging: Types.OffsetPaging;
}>;

export type TaskStagesSelectQuery = {
  taskStages: {
    totalCount: number;
    nodes: Array<{ id: string; title: string }>;
  };
};
