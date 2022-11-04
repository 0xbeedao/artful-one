import { Icon } from '@chakra-ui/react';
import { Box } from "@chakra-ui/react";
import Link from 'next/link';

export interface HeaderLinkProps {
	href: string;
	icon: any;
	children: React.ReactNode;
};

export function HeaderLink({ href, children, icon }: HeaderLinkProps): JSX.Element {
	return (
		<Box pr="1em" className="headerLink">
			<Link href={href} passHref={true}>
				<Box>
					<Icon as={icon} h="1.5rem" mr="0.5em" verticalAlign="bottom" />
					{children}
				</Box>
			</Link>
		</Box>
	);
}
