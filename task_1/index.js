import { encoded, translations } from './data.js'

console.log("Let's rock")
// console.log(encoded, translations)
function decodeFields(encoded, translations) {
    let uniqueIds = [];

    // Iterate over each object in the encoded array
    const decoded = encoded.map(obj => {
        const decodedObj = {};

        // Пройтись по ключам в текущем объекте
        for (const key in obj) {
            if (key.endsWith('Id')) {
                // Получить значение текущего ключа
                const value = obj[key];
                // Проверьте, существует ли значение в translations
                if (translations[value]) {
                    // Расшифровка
                    decodedObj[key] = translations[value];
                    // Добавить уникальный идентификатор в массив, если он еще не существует
                    if (!uniqueIds.includes(value)) {
                        uniqueIds.push(value);
                    }
                } else {
                    // Сохраните исходное значение, если оно не существует в translations
                    decodedObj[key] = value;
                }
            } else {
                // Если поле не без суффикса id
                decodedObj[key] = obj[key];
            }
        }

        return decodedObj;
    });
    uniqueIds.sort()
    return { decoded, uniqueIds };
}

const result = decodeFields(encoded, translations);
console.log(result.decoded);
console.log(result.uniqueIds);

// console.log(decoded)
