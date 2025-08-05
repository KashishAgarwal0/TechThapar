import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
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

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);
	const [loading, setLoading] = useState(false);

	const handleSignup = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
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
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.900")}
			px={4}
		>
			<Box
				maxW={"lg"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"xl"}
				p={8}
			>
				<Stack spacing={6}>
					<Stack align={"center"}>
						<Heading fontSize={"3xl"}>Create Your Account</Heading>
					</Stack>

					<HStack spacing={4}>
						<Box flex={1}>
							<FormControl isRequired>
								<FormLabel>Full Name</FormLabel>
								<Input
									placeholder="Enter Your Name"
									type="text"
									value={inputs.name}
									onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
								/>
							</FormControl>
						</Box>
						<Box flex={1}>
							<FormControl isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									placeholder="Enter a Username (eg. Kashish12)"
									type="text"
									value={inputs.username}
									onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
								/>
							</FormControl>
						</Box>
					</HStack>

					<FormControl isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder="Enter Your Email address"
							type="email"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</FormControl>

					<FormControl isRequired>
						<FormLabel>Password</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="Enter a strong password"
								value={inputs.password}
								onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							/>
							<InputRightElement h={"full"}>
								<Button
									variant="ghost"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? <ViewIcon /> : <ViewOffIcon />}
								</Button>
							</InputRightElement>
						</InputGroup>
					</FormControl>

					<Stack spacing={6} pt={4}>
						<Button
							isLoading={loading}
							loadingText="Creating account"
							size="lg"
							bg={"blue.500"}
							color={"white"}
							_hover={{ bg: "blue.600" }}
							onClick={handleSignup}
						>
							Sign up
						</Button>
					</Stack>

					<Stack pt={2}>
						<Text align={"center"} fontSize="sm">
							Already a user?{" "}
							<Link color={"blue.400"} onClick={() => setAuthScreen("login")} fontWeight="medium">
								Login
							</Link>
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Flex>
	);
}
