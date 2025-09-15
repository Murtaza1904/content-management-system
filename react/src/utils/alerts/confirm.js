import Swal from "sweetalert2";

export const confirmAlert = (message, action) => {
    return Swal.fire({
        title: message,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            action();
        }
    });
};
