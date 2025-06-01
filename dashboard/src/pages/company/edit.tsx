import CustomAvatar from "@/;components/custom-avatar";
import SelectOptionWithAvatar from "@/;components/home/select-option-with-avatar";
import { UPDATE_COMPANY_MUTATION } from "@/;graphql/mutations";
import { USERS_SELECT_QUERY } from "@/;graphql/queries";
import { UsersSelectQuery } from "@/;graphql/types";
import { getNameInitials } from "@/;utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Row } from "antd";
import Select from "antd/lib/select";

const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, query } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  // Omit 'children' from formProps to avoid type error
  const { children, ...restFormProps } = formProps;
  const { avatarUrl, name } = query?.data?.data || {};

  const { selectProps, query: usersQuery } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
      resource: "users",
      optionLabel: "name",
      meta: {
        gqlQuery: USERS_SELECT_QUERY,
      },
    });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit isLoading={formLoading}>
            <Form layout="vertical" {...restFormProps}>
              <CustomAvatar
                src={avatarUrl}
                name={name}
                style={{ width: 96, height: 96, marginBottom: 24 }}
                shape="square"
              />
              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwnerId?.id}
              >
                <Select
                  placeholder="Please select a sales owner"
                {...selectProps}
                  options={
                    usersQuery?.data?.data.map((user: any) => ({
                      values: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          avatarUrl={user.avatarUrl ?? undefined}
                          name={user.name}
                        />
                      ),
                    })) ?? []
                  }
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
