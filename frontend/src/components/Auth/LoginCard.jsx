import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../../atoms/authAtom";
import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";

export default function LoginCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();

	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error.message || "Something went wrong", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Flex
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.900")}
			minH={"100vh"}
			px={4}
		>
			<Box
				maxW={"md"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"xl"}
				p={8}
			>
				<Stack spacing={6}>
					<Stack align={"center"}>
						<Heading fontSize={"3xl"}>Welcome Back</Heading>
						<Text fontSize={"md"} color={"gray.500"}>
							Login to your account
						</Text>
					</Stack>

					<FormControl isRequired>
						<FormLabel>Username</FormLabel>
						<Input
							type="text"
							placeholder="Enter your username"
							value={inputs.username}
							onChange={(e) =>
								setInputs((inputs) => ({ ...inputs, username: e.target.value }))
							}
						/>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								value={inputs.password}
								onChange={(e) =>
									setInputs((inputs) => ({ ...inputs, password: e.target.value }))
								}
							/>
							<InputRightElement h={"full"}>
								<Button
									variant={"ghost"}
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<Button
						bg={"blue.500"}
						color={"white"}
						_hover={{
							bg: "blue.600",
						}}
						isLoading={loading}
						onClick={handleLogin}
						size="lg"
						fontWeight="semibold"
						transition="background 0.3s"
					>
						Login
					</Button>

					<Stack pt={2}>
						<Text align={"center"} fontSize={"sm"}>
							Don&apos;t have an account?{" "}
							<Link
								color={"blue.400"}
								fontWeight="medium"
								cursor="pointer"
								onClick={() => setAuthScreen("signup")}
							>
								Sign up
							</Link>
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	);
}
