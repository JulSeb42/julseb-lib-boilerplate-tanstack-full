import { useState, useEffect, useRef } from "react"
import { Cloudinary } from "@cloudinary/url-gen/index"
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react"
import { BiImage, BiEdit, BiX } from "react-icons/bi"
import {
	InputContainer,
	Image,
	ButtonIcon,
	Modal,
	Alert,
	Text,
	Button,
	Flexbox,
	clsx,
} from "@julseb-lib/react"
import { defaultUwConfig } from "data"
import { useAuth, useModalOpen } from "context"
import type { IImageUploader } from "./types"

const cloudName = import.meta.env.VITE_CLOUDINARY_NAME

export const ImageUploader: FC<IImageUploader> = ({
	uwConfig = defaultUwConfig,
	pictureData,
	setPictureData,
	icons,
	...rest
}) => {
	const { user } = useAuth()
	const { setHasModalOpen } = useModalOpen()
	const [isOpen, setIsOpen] = useState(false)

	const uploadWidgetRef = useRef(null)
	const uploadButtonRef = useRef<HTMLButtonElement>(null)
	const [currentImg, setCurrentImg] = useState(
		(user?.avatar || pictureData?.public_id) ?? "",
	)

	const cld = new Cloudinary({ cloud: { cloudName } })

	useEffect(() => {
		const initializeUploadWidget = () => {
			if ((window as any).cloudinary && uploadButtonRef?.current) {
				// Create upload widget
				uploadWidgetRef.current = (
					window as any
				).cloudinary.createUploadWidget(
					uwConfig,
					(error: any, result: any) => {
						if (!error && result && result.event === "success") {
							console.log("Upload successful:", result.info)
							console.log({ result })
							setPictureData(result.info)
							setCurrentImg(result.info.secure_url)
						}
					},
				)

				// Add click event to open widget
				const handleUploadClick = () => {
					if (uploadWidgetRef.current) {
						;(uploadWidgetRef as any).current.open()
					}
				}

				const buttonElement = uploadButtonRef.current
				buttonElement.addEventListener("click", handleUploadClick)

				// Cleanup
				return () => {
					buttonElement.removeEventListener(
						"click",
						handleUploadClick,
					)
				}
			}
		}

		initializeUploadWidget()
	}, [pictureData, uwConfig, setPictureData, currentImg])

	return (
		<>
			<InputContainer className="relative" {...rest}>
				<button
					type="button"
					ref={uploadButtonRef}
					className={clsx(
						"relative flex justify-center items-center bg-gray-200 rounded-md size-20 text-primary-500",
						"hover:[&_.hover-container]:opacity-100",
					)}
				>
					{currentImg ? (
						<Image
							src={currentImg}
							className="block size-20"
							borderRadius="md"
						/>
					) : (
						(icons?.empty ?? <BiImage size={48} />)
					)}

					{pictureData && (
						<AdvancedImage
							cldImg={cld.image(currentImg)}
							plugins={[
								responsive(),
								placeholder({ mode: "blur" }),
							]}
						/>
					)}

					<span
						className={clsx(
							"top-0 left-0 absolute flex justify-center items-center bg-overlay-white-50 opacity-0 size-full text-primary-500 transition-opacity duration-200 ease-in-out",
							"hover-container",
						)}
					>
						{icons?.hover ?? <BiEdit size={32} />}
					</span>
				</button>

				{currentImg && (
					<ButtonIcon
						icon={<BiX />}
						type="button"
						onClick={e => {
							e.stopPropagation()
							setHasModalOpen(true)
							setIsOpen(true)
						}}
						color="danger"
						className={clsx(
							"top-[16px] left-[66px] absolute size-6",
						)}
					/>
				)}
			</InputContainer>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} hideCloseButton>
				<Alert color="danger" className="max-w-[600px]">
					<Text>
						Are you sure you want to delete your profile picture?
					</Text>

					<Flexbox gap="xs">
						<Button
							color="danger"
							onClick={() => {
								setCurrentImg("")
								setPictureData(undefined as any)
								setHasModalOpen(false)
								setIsOpen(false)
							}}
							type="button"
						>
							Yes, delete picture
						</Button>

						<Button
							variant="transparent"
							onClick={() => {
								setHasModalOpen(false)
								setIsOpen(false)
							}}
							color="danger"
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}
