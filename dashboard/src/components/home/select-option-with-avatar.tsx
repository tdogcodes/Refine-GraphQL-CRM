import CustomAvatar from "../custom-avatar";
import { Text } from "../text";

type props = {
  name: string;
  avatarUrl: string;
  shape?: "circle" | "square";
};

const SelectOptionWithAvatar = ({ avatarUrl, name, shape }: props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <CustomAvatar src={avatarUrl} shape={shape} name={name} />
      <Text>{name}</Text>
    </div>
  );
};

export default SelectOptionWithAvatar;
