import Swal from "sweetalert2";

export const showConfirmDialog = async ({
											title = "Вы уверены?",
											text = "Это действие нельзя отменить.",
											icon = "warning",
											confirmButtonText = "Да, подтвердить",
											cancelButtonText = "Отмена",
											confirmButtonColor = "#d33",
											cancelButtonColor = "#3085d6",
										}) => {
	return await Swal.fire({
		title,
		text,
		icon,
		showCancelButton: true,
		confirmButtonColor,
		cancelButtonColor,
		confirmButtonText,
		cancelButtonText,
	});
};

export const showSuccessDialog = async ({
											title = "Успех!",
											text = "Операция выполнена успешно.",
											icon = "success",
											confirmButtonText = "ОК",
											confirmButtonColor = "#28a745",
										}) => {
	return await Swal.fire({
		title,
		text,
		icon,
		confirmButtonColor,
		confirmButtonText,
	});
};

export const showErrorDialog = async ({
										  title = "Ошибка!",
										  text = "Что-то пошло не так.",
										  icon = "error",
										  confirmButtonText = "ОК",
										  confirmButtonColor = "#d33",
									  }) => {
	return await Swal.fire({
		title,
		text,
		icon,
		confirmButtonColor,
		confirmButtonText,
	});
};