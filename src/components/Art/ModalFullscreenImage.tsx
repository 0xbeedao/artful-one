import {
	Box,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';

type ModalImageProps = {
	isOpen: boolean;
	onClose: () => void;
	alt: string;
	url: string;
}

export default function ModalFullscreenImage(props: ModalImageProps): JSX.Element {
	const { alt, isOpen, onClose, url } = props;
	const { height } = useWindowSize();

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc closeOnOverlayClick size="full">
			<ModalOverlay />
			<ModalContent>
				<ModalBody bgColor="gray.600">
					<Box
						background={`url(${url}) no-repeat center center`}
						backgroundSize="contain"
						height={`${height}px`}
					>
						&nbsp;
					</Box>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
