'use client';

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';

export const FilterSort = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="cursor-pointer uppercase mr-4 mb-10 block ml-auto mt-8 px-4 py-2 text-black border border-black rounded-full"
      >
        Filter / Sort
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} data-lenis-prevent>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="border-b font-medium flex flex-col gap-1">
                Filter / Sort
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter className="flex justify-between gap-4 p-4 border-t">
                <Button
                  className="rounded-full"
                  variant="light"
                  onPress={onClose}
                >
                  Clear All
                </Button>
                <Button
                  className="text-white bg-black rounded-full"
                  onPress={onClose}
                >
                  Search
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
