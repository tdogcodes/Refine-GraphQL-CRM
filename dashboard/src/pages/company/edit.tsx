import CustomAvatar from "@/;components/custom-avatar";
import SelectOptionWithAvatar from "@/;components/home/select-option-with-avatar";
import { businessTypeOptions, companySizeOptions, industryOptions } from "@/;constants";
import { UPDATE_COMPANY_MUTATION } from "@/;graphql/mutations";
import { USERS_SELECT_QUERY } from "@/;graphql/queries";
import { UsersSelectQuery } from "@/;graphql/types";
import { getNameInitials } from "@/;utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Input, InputNumber, Row } from "antd";
import Select from "antd/lib/select";
import { CompanyContactsTable } from "./contacts-table";

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

  const { selectProps, query: usersQuery } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <Form layout="vertical" {...restFormProps}>
              <CustomAvatar
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 96, height: 96, marginBottom: 24 }}
                shape="square"
              />
              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  placeholder="Select a sales owner"
                  {...selectProps}
                  options={
                    usersQuery?.data?.data.map((user: any) => ({
                      value: user.id,
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
              <Form.Item name="companySize" label="Company Size">
                <Select
                  options={companySizeOptions}
                  placeholder="Select a company size"
                />
              </Form.Item>
              <Form.Item name="annualRevenue" label="Annual Revenue">
                <InputNumber
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder="Enter annual revenue"
                />
              </Form.Item>
              <Form.Item label="Industry" name="industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business Type" name="businessType">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input placeholder="country" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input placeholder="website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
              <CompanyContactsTable/>
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
