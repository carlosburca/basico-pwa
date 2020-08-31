

export default {
	formatNumber: (number) => {
		if (number === undefined || number === '') {
			number = 0;
		}

		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	},

	capitalize: (text) => {
		if (typeof (text) !== 'string' || !text.length) {
			return '';
		} else {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}
	},

	validateEmail: (email) => {
		if (typeof (email) !== 'string' || !email.length) {
			return false;
		} else {
			/* const validator = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; */
			const validator = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
			const response = validator.test(email);

			return response;
		}
	},

	tipoDte: (tipoDte) => {
		let tipo = !Number.isInteger(tipoDte) ? parseInt(tipoDte) : tipoDte;

		switch (tipo) {
			case 33: tipoDte = "Factura electrónica";
				break;
			case 34: tipoDte = "Factura exenta electrónica";
				break;
			case 39: tipoDte = "Boleta electrónica";
				break;
			case 41: tipoDte = "Boleta exenta electrónica";
				break;
			case 43: tipoDte = "Liquidación de factura";
				break;
			case 46: tipoDte = "Factura de compra electrónica";
				break;
			case 52: tipoDte = "Guía de despacho electrónica";
				break;
			case 56: tipoDte = "Nota de debito electrónica";
				break;
			case 61: tipoDte = "Nota de crédito electrónica";
				break;
			case 110: tipoDte = "Factura de exportación electrónica";
				break;
			case 111: tipoDte = "Nota de debito de exportación electrónica";
				break;
			case 112: tipoDte = "Nota de crédito de exportación electrónica";
				break;

			default: tipoDte = "DTE";

		}

		return tipoDte;
	},


};