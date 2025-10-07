export function dataValidator({ formData, isSignUp, setFormError, whichOne }) {
    const VALID_NAME_PATTERN = /^[a-zA-Z' -]{2,50}$/;
    const VALID_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const VALID_PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (whichOne === "ALL" || whichOne === "NAME") {
        if (isSignUp && !VALID_NAME_PATTERN.test(formData.name)) {
            setFormError((pre => ({
                ...pre,
                name: {
                    error: true,
                    errorMsg: "Name must be 2–50 letters and can include spaces, hyphens, or apostrophes."
                }
            })));

            return false;
        }
    }

    if (whichOne === "ALL" || whichOne === "EMAIL") {
        if (!VALID_EMAIL_PATTERN.test(formData.email)) {
            setFormError((pre => ({
                ...pre,
                email: {
                    error: true,
                    errorMsg: "Please enter a valid email."
                }
            })));

            return false;
        }
    }


    if (whichOne === "ALL" || whichOne === "PASSWORD") {
        if (isSignUp && !VALID_PASSWORD_PATTERN.test(formData.password)) {
            setFormError((pre => ({
                ...pre,
                password: {
                    error: true,
                    errorMsg: "Password must be 8+ chars with upper, lower, number, and symbol."
                }
            })));

            return false;
        }
    }

    return true
}