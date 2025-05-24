import { getNameInitials } from '@/;utilities/get-name-initials';
import { Avatar as AntdAvatar, AvatarProps} from 'antd'

type Props = AvatarProps & {
    name?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

const CustomAvatar = ({ name, style, ...rest } : Props) => {
  return (
    <AntdAvatar
        alt='Test User'
        size="small"
        style={{backgroundColor: '#f56a00',
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            ...style,
        }}
        {...rest}
    >
        {getNameInitials(name || '', 2)}
    </AntdAvatar>
  )
}

export default CustomAvatar