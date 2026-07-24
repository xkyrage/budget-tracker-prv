const container =
    document.getElementById("toastContainer");

/**
 * Show Toast
 *
 * Types:
 * success
 * error
 * warning
 * info
 */

export function showToast(

    message,

    type = "success",

    duration = 3000

){

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    const icons = {

        success:"✅",

        error:"❌",

        warning:"⚠️",

        info:"ℹ️"

    };

    toast.innerHTML = `
<div class="toast-content">
    <span>${icons[type]}</span>
    <span>${message}</span>
</div>

<div class="toast-progress"></div>
`;

    container.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },duration);

}

/**
 * Shortcut helpers
 */

export function success(message){

    showToast(message,"success");

}

export function error(message){

    showToast(message,"error");

}

export function warning(message){

    showToast(message,"warning");

}

export function info(message){

    showToast(message,"info");

}