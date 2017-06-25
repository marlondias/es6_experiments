/*
comissao_total_deposito
prejuizo_deposito
custo_total_deposito
valor_disponivel_deposito

//modal
deposito_comissaoPercentual
deposito_comissaoReais
deposito_custoBancario
deposito_valorInicial

saque_comissaoPercentual
saque_comissaoReais
saque_custoBancario
saque_valorInicial

transacao_tipo
transacao_comissao
transacao_valorBitcoin
transacao_valorReais
*/

function validateBRL(str){
	const regex  = /^\d+(?:\,\d{0,2})$/;
	if (regex.test(str)) return Number(str);
	return null;
}

function validateBTC(str){
	const regex  = /^\d+(?:\,\d{0,8})$/;
	if (regex.test(str)) return Number(str);
	return null;
}

const register = [];

$('.validate-brl').each(function(){
	var elem = $(this);
	var regex = /^\d+(?:\,\d{0,2})$/;

	// Save current value
	elem.data('oldVal', elem.val());

	// Look for changes in the value
	elem.bind("propertychange change click keyup input paste", function(event){
		if (elem.data('oldVal') != elem.val()) {
			// Updated stored value
			elem.data('oldVal', elem.val());

			// Validate
			if (regex.test(elem.val())) $(this).removeClass('invalid');
			else $(this).addClass('invalid');
		}
	});
});

$('.validate-btc').each(function(){
	var elem = $(this);
	var regex = /^\d+(?:\,\d{0,8})$/;

	// Save current value
	elem.data('oldVal', elem.val());

	// Look for changes in the value
	elem.bind("propertychange change click keyup input paste", function(event){
		if (elem.data('oldVal') != elem.val()) {
			// Updated stored value
			elem.data('oldVal', elem.val());

			// Validate
			if (regex.test(elem.val())) $(this).removeClass('invalid');
			else $(this).addClass('invalid');
		}
	});
});

$('.validate-percent').each(function(){
	var elem = $(this);

	// Save current value
	elem.data('oldVal', elem.val());

	// Look for changes in the value
	elem.bind("propertychange change click keyup input paste", function(event){
		if (elem.data('oldVal') != elem.val()) {
			// Updated stored value
			elem.data('oldVal', elem.val());

			// Validate
			if (!isNaN(elem.val())) $(this).removeClass('invalid');
			else $(this).addClass('invalid');
		}
	});
});




