import PropTypes from "prop-types";

function AvatarUploader({currentImage, uploadedFile, onFileChange}) {
	return (
		<div className="flex flex-col items-center my-6">
			<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-300">
				{uploadedFile ? (
					<img src={uploadedFile} alt="avatar preview" className="w-full h-full object-cover"/>
				) : (
					currentImage && (
						<img src={currentImage} alt="current avatar" className="w-full h-full object-cover"/>
					)
				)}
			</div>
			<label
				htmlFor="file-upload"
				className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-lg flex items-center justify-center cursor-pointer shadow-lg hover:bg-green-400 transition"
			>
				<span className="mr-2">Upload Avatar</span>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={onFileChange}
					className="hidden"
				/>
			</label>
		</div>
	);
}

AvatarUploader.propTypes = {
	currentImage: PropTypes.string,
	uploadedFile: PropTypes.string,
	onFileChange: PropTypes.func.isRequired,
};

export default AvatarUploader;