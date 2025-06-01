import { Form, Modal } from "antd";
import CompanyList from "./list";
import { useModalForm } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { useSelect } from "@refinedev/antd";
import { CREATE_COMPANY_MUTATION } from "@/;graphql/mutations";
import { USERS_SELECT_QUERY } from "@/;graphql/queries";
import { Input, Select } from "antd/lib";
import SelectOptionWithAvatar from "@/;components/home/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/;graphql/types";

const Create = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: {
        resource: "companies",
        action: "list",
      },
      options: { keepQuery: true },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps,  query: usersQuery} = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <CompanyList {...formProps}>
      <Modal {...modalProps} mask={true} onCancel={goToListPage} title="Create Company" width={512}>
        <Form {...formProps} layout="vertical" autoComplete="off">
            <Form.Item
                label="Company Name"
                name="name"
                rules={[{ required: true}]}
            >
                <Input placeholder="Please enter a company name" />
            </Form.Item>
            <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                rules={[{ required: true}]}
            >
                <Select
                  {...selectProps}
                  placeholder="Please select a sales owner"
                  options={usersQuery?.data?.data?.map((user: any) => ({
                    values: user.id,
                    label: (
                      <SelectOptionWithAvatar
                        avatarUrl={user.avatarUrl ?? undefined}
                        name={user.name} />
                    )
                  })) ?? []
                }
                />
            </Form.Item>
        </Form>

      </Modal>
    </CompanyList>
  );
};

export default Create;
