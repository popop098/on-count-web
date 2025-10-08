import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import OnCountLogo from "@/public/icon.png";
import ChzzkLogo from "@/public/chzzk_Icon_02.png";
import { useUser } from "@/store/userStore";

const menuItems = [{ name: "메인", href: "/" }];

export const NavBarComp = () => {
  const {
    isOpen: signinModalIsOpen,
    onOpen: signinModalOnOpen,
    onOpenChange: signinModalOnOpenChange,
  } = useDisclosure();
  const pathname = usePathname();
  const [isSigninBtnLoading, setIsSigninBtnLoading] = useState(false);
  const [isMenuOpen, _setIsMenuOpen] = useState(false);
  const user = useUser();

  const handleSigninBtn = async () => {
    setIsSigninBtnLoading(true);
    const generateSigninLink = await fetch("/api/auth/login", {});
    const findSigninLink = await generateSigninLink.text();

    window.location.href = findSigninLink;
  };

  const handleSignoutBtn = async () => {
    window.location.href = "/api/auth/logout";
  };

  return (
    <>
      <Modal isOpen={signinModalIsOpen} onOpenChange={signinModalOnOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                들어가기
              </ModalHeader>
              <ModalBody>
                <Button
                  fullWidth
                  variant="shadow"
                  isLoading={isSigninBtnLoading}
                  onPress={handleSigninBtn}
                >
                  <div className="flex gap-1 items-center justify-center">
                    <Image
                      src={ChzzkLogo}
                      alt={"ChzzkLogo"}
                      width={30}
                      height={30}
                    />
                    <p className="text-lg font-bold">치지직으로 로그인하기</p>
                  </div>
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Navbar
        isBordered
        className="w-[80%] fixed mx-auto mt-5 rounded-3xl h-fit"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "닫기" : "열기"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Image
              src={OnCountLogo}
              alt={"OnCount Logo"}
              width={50}
              height={50}
              className="rounded-xl"
            />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NavbarItem key={link.href} isActive={isActive}>
                <Link
                  color={isActive ? "primary" : "foreground"}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </NavbarItem>
            );
          })}
          {user && (
            <NavbarItem isActive={pathname === "/me"}>
              <Link
                color={pathname === "/me" ? "primary" : "foreground"}
                href={"/me"}
                aria-current={pathname === "/me" ? "me" : undefined}
              >
                프로필
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  src={user.channelImageUrl}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Menus"
                variant="flat"
                disabledKeys={["profile"]}
              >
                <DropdownSection showDivider>
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-thin text-xs">
                      {user.channelName}(으)로 로그인 되었습니다.
                    </p>
                    <p className="font-thin text-[0.7rem] text-right text-gray-400">
                      {user.channelId}
                    </p>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="위험 구역">
                  <DropdownItem
                    onPress={handleSignoutBtn}
                    color="danger"
                    className="text-danger"
                    description="현재 로그인한 계정에서 로그아웃 합니다."
                    key="signOut"
                  >
                    로그아웃
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button color="primary" onPress={signinModalOnOpen}>
              들어가기
            </Button>
          )}
        </NavbarContent>
        <NavbarMenu className="flex-col justify-center items-center gap-4">
          {menuItems.map((link, index) => {
            const isActive = pathname === link.href;
            return (
              <NavbarMenuItem key={`${link.name}-${index}`} isActive={isActive}>
                <Link
                  className="w-full text-3xl underline underline-offset-8"
                  href={link.href}
                  size="lg"
                  color={isActive ? "primary" : "foreground"}
                >
                  {link.name}
                </Link>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </Navbar>
    </>
  );
};
