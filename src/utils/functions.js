/** @format */

export function sortArrayByDate(array) {
	return array.sort(function (a, b) {
		return new Date(b.date) - new Date(a.date)
	})
}
export function convertFormatDate(item) {
	let dateString = item
	var info = dateString.split('-')
	return info[2] + '/' + info[1] + '/' + info[0]
}
