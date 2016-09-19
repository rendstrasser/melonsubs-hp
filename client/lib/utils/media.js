import NoProjectCoverImage from 'projects/no-project-cover.jpg'
import NoProjectHeaderImage from 'projects/no-project-cover.jpg'
import NoProjectAvatarImage from 'projects/no-project-cover.jpg'
import NoReleasePreviewImage from 'projects/no-project-cover.jpg'
import NoMultiMediaImage from 'projects/no-project-cover.jpg'

export function getMediaLink(file, defaultFilePath = "") {
	if (!file) {
		return defaultFilePath;
	}

	return "/media/" + file;
}

export function noProjectCoverSrc() {
	return NoProjectCoverImage;
}

export function noProjectHeaderSrc() {
	return NoProjectHeaderImage;
}

export function noProjectAvatarSrc() {
	return NoProjectAvatarImage;
}

export function noProjectReleasePreviewSrc() {
	return NoReleasePreviewImage;
}

export function noMultiMediaImageSrc() {
	return NoMultiMediaImage;
}

export function getElemById(id, elems) {
	if (!id) {
  		return undefined;
  	}

  	const elem = elems.find((elem) => elem.id == id);
  	if (!elem) {
  		return undefined;
  	}

  	return elem;
}