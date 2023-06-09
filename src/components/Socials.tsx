import {NextPage} from 'next';
import {FC, memo} from 'react';

import {IconProps} from '../components/Icon/Icon';
import {mapSocialToIcon} from '../data/data';
import {GithubData} from '../data/dataDef';

const Socials: NextPage<GithubData> = memo(({socialLinks}) => (
  <>
    {socialLinks.map(({label, href}) => {
      const Icon: FC<IconProps> = mapSocialToIcon(label);
      return (
        <a
          aria-label={label}
          className="-m-1.5 rounded-md p-1.5 transition-all duration-300 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500  sm:-m-3 sm:p-3"
          href={href}
          key={label}>
          <Icon className="h-5 w-5 align-baseline sm:h-6 sm:w-6" />
        </a>
      );
    })}
  </>
));

Socials.displayName = 'Socials';
export default Socials;
