import { useEffect, useRef, useState } from "react";
import { CircleUserRound, Pencil, Upload, X } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { useUploadProfilePictureMutation } from "../../features/userActivity/userActivityApiSlice";
import { auth } from "../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { setToast } from "../../features/auth/authSlice";

const ProfilePicture = () => {
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [updateProfilePicture, { isLoading }] = useUploadProfilePictureMutation();

    const currentPhotoURL = auth.currentUser?.photoURL;

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handlePencilClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            dispatch(
                setToast({
                    message: "Please select an image.",
                    error: true,
                    show: true,
                    warning: false,
                })
            );
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            dispatch(
                setToast({
                    message: "Image must be smaller than 5 MB.",
                    error: false,
                    show: true,
                    warning: true,
                })
            );
            return;
        }

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const previewURL = URL.createObjectURL(file);

        setSelectedFile(file);
        setPreview(previewURL);

        e.target.value = "";
    };

    const handleCancel = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);
        setSelectedFile(null);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!selectedFile || isLoading) return;

        try {
            const formData = new FormData();

            formData.append("profilePic", selectedFile);

            const data = await updateProfilePicture(formData).unwrap();

            const photoURL = data?.photoURL;

            if (auth.currentUser && photoURL) {
                await updateProfile(auth.currentUser, {
                    photoURL,
                });
            }

            if (preview) {
                URL.revokeObjectURL(preview);
            }

            setPreview(null);
            setSelectedFile(null);

        } catch (error) {
            console.error("Profile picture upload failed:", error);

            dispatch(
                setToast({
                    message:
                        "Something went wrong. Please try again later",
                    error: true,
                    show: true,
                    warning: false,
                })
            );
        }
    };

    const imageSrc = preview || currentPhotoURL;

    return (
        <form
            onSubmit={submitHandler}
            className="relative flex flex-col items-center"
        >
            <div className="relative w-32 h-32">

                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover border-2 border-primary"
                    />
                ) : (
                    <CircleUserRound className="w-full h-full" strokeWidth={0.5} />
                )}

                <button
                    type="button"
                    onClick={
                        preview
                            ? handleCancel
                            : handlePencilClick
                    }
                    className="
                        absolute
                        bottom-1
                        right-1
                        w-9
                        h-9
                        rounded-full
                        bg-primary
                        shadow-md
                        flex
                        items-center
                        justify-center
                        hover:bg-gray-100
                        hover:text-black
                        text-white
                        transition
                    "
                    aria-label="Change profile picture"
                >
                    {preview ? (
                        <X size={17} />
                    ) : (
                        <Pencil size={17} />
                    )}
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {selectedFile && (
                <div className="flex items-center gap-3 mt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-lg
                            bg-black
                            text-white
                            text-sm
                            cursor-pointer
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        <Upload size={16} />

                        {isLoading
                            ? "Uploading..."
                            : "Upload"}
                    </button>
                </div>
            )}
        </form>
    );
};

export default ProfilePicture;