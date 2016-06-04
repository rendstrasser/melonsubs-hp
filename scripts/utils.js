import NoCoverImage from '../images/projects/no-project-cover.jpg'

export function getMediaLink(file, defaultFilePath = "") {
	if (!file) {
		return defaultFilePath;
	}

	return "/media/" + file;
}

export function noProjectCoverSrc() {
	return NoCoverImage;
}

export function normalizeEmptyFormValue(value) {
	if(!value) {
		return undefined;
	}

	return value;
}