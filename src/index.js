import './gh_date_input.js';
import './date_range_service.js';
import './gh_date_input.scss';

import { format } from 'date-fns';
import GetDropdownValues from './GetDropdownValues.js';

export default class DateData {
	getTemplate() {
		return {
			constructor: 'field',
			name: 'Date',
			icon: 'date_gh_element',
			type: 'date',
			style: ['font_size', 'alignment', 'width_type'],
			model: {
				field_id: 0,
				field_name: 'Date',
				field_value: new Date().getTime(),
				data_id: 0,
				data_type: 'date',
				file_name: '0',
				data_model: {
					date_format: 'yyyy/M/dd h:m:s',
					time_picker: false,
					data_range: false,
					use_default_value: false,
					default_field_value: 0,
					today_as_default_field_value: false,
					hour_format: 'hh',
					dafault_value: '',
					interpretation: [{
						src: 'table',
						id: 'small',
						settings: {
							editable: 0,
							show_field_name: 0,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}, {
						src: 'form',
						id: 'default',
						settings: {
							editable: 1,
							show_field_name: 1,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}, {
						src: 'dropdown',
						id: 'small',
						settings: {
							editable: 0,
							show_field_name: 0,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}, {
						src: 'input',
						id: 'small',
						settings: {
							editable: 0,
							show_field_name: 0,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}, {
						src: 'input_list',
						id: 'small',
						settings: {
							editable: 0,
							show_field_name: 0,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}, {
						src: 'document',
						id: 'plain_text',
						settings: {
							editable: 0,
							show_field_name: 0,
							show_field: 1,
							display_mode: 'date-time'
						},
						style: {}
					}]
				}
			}
		};
	}
	filter = {
		_search_options: [{
			id: 'range',
			name: 'Between two dates',
			html: '<gh-date-input class="gh-date-input" gh-field-model="field" editable="true" datarange="true" gh-model="filter.valuesArray" gh-mode="plain_text" />'
		},
		{
			id: 'month_before_date',
			name: 'Month Before Date ',
			html: '<gh-date-input class="gh-date-input" gh-field-model="field" editable="true" gh-model="filter.valuesArray[0]" gh-mode="d_w_m_y" />'
		},
		{
			id: 'date_in',
			name: 'Date in range',
			html: `<gh-input gh-dropdown=" [{name: \'Today\', value: \'day:0:1\'},
																			{name: \'Tomorrow\', value: \'day:1:1\'},
																			{name: \'Yesterday\', value: \'day:-1:1\'},
																			{name: \'Next 7 days\', value: \'days:1:1\'},
																			{name: \'Past 7 days\', value: \'days:-1:1\'},
																			{name: \'Sunday\', value: \'day_week:0:1\'},
																			{name: \'Monday\', value: \'day_week:1:1\'},
																			{name: \'Tuesday\', value: \'day_week:2:1\'},
																			{name: \'Wednesday\', value: \'day_week:3:1\'},
																			{name: \'Thursday\', value: \'day_week:4:1\'},
																			{name: \'Friday\', value: \'day_week:5:1\'},
																			{name: \'Saturday\', value: \'day_week:6:1\'},
																			{name: \'Current week\', value: \'week:0:1\'},
																			{name: \'Next week\', value: \'week:1:1\'},
																			{name: \'Past week\', value: \'week:-1:1\'},
																			{name: \'Past 2 weeks\', value: \'week:-2:1\'},
																			{name: \'Current month\', value: \'month:0:1\'},
																			{name: \'Next month\', value: \'month:1:1\'},
																			{name: \'Past month\', value: \'month:-1:1\'},
																			{name: \'Current year\', value: \'year:0:1\'},
																			{name: \'Next year\', value: \'year:1:1\'},
																			{name: \'Past year\', value: \'year:-1:1\'}]"
					 gh-mode="plain_text" 
					 ng-model="filter.valuesArray[0]" 
					 gh-data-type="text_opt" size="small"/>`,
		},
		{
			id: 'date_out',
			name: 'Date out of range',
			html: `<gh-input gh-dropdown=" [{name: \'Today\', value: \'day:0:0\'},
																			{name: \'Tomorrow\', value: \'day:1:0\'},
																			{name: \'Yesterday\', value: \'day:-1:0\'},
																			{name: \'Next 7 days\', value: \'days:1:0\'},
																			{name: \'Past 7 days\', value: \'days:-1:0\'},
																			{name: \'Sunday\', value: \'day_week:0:0\'},
																			{name: \'Monday\', value: \'day_week:1:0\'},
																			{name: \'Tuesday\', value: \'day_week:2:0\'},
																			{name: \'Wednesday\', value: \'day_week:3:0\'},
																			{name: \'Thursday\', value: \'day_week:4:0\'},
																			{name: \'Friday\', value: \'day_week:5:0\'},
																			{name: \'Saturday\', value: \'day_week:6:0\'},
																			{name: \'Current week\', value: \'week:0:0\'},
																			{name: \'Next week\', value: \'week:1:0\'},
																			{name: \'Past week\', value: \'week:-1:0\'},
																			{name: \'Current month\', value: \'month:0:0\'},
																			{name: \'Next month\', value: \'month:1:0\'},
																			{name: \'Past month\', value: \'month:-1:0\'},
																			{name: \'Current year\', value: \'year:0:0\'},
																			{name: \'Next year\', value: \'year:1:0\'},
																			{name: \'Past year\', value: \'year:-1:0\'}]"
					 gh-mode="plain_text" 
					 ng-model="filter.valuesArray[0]" 
					 gh-data-type="text_opt" size="small"/>`,
		}, {
			id: 'value',
			name: 'Value',
			html: '<gh-input gh-dropdown="[{name: \'Is Defined\', value: \'true\'}, {name: \'Is Not Defined\', value: \'false\'}]" gh-mode="plain_text" ng-model="filter.valuesArray[0]" gh-data-type="text_opt" size="small"/>'
		}, {
			id: 'recurring_date',
			name: 'Recurring Date',
			html: `<gh-input gh-dropdown="[{name: \'Today\', value: \'day\'},
																		 {name: \'This week\', value: \'week\'},
																		 {name: \'This month\', value: \'month\'}]"
																		 ng-model="filter.valuesArray[0]"
																		 gh-mode="plain_text"
																		 gh-data-type="text_opt" size="small" />`
		}],

		getSearchOptions: function () {
			return this._search_options;
		},

	}

	getInterpretation(gudhub, fieldValue, appId, itemId, fieldModel) {

		return [{
			id: 'default',
			name: 'Day, month, year',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="small" />'
		}, {
			id: 'd_w_m_y',
			name: 'Day, week, month, year',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="d_w_m_y" />'
		}, {
			id: 'd_m_t',
			name: 'Day, month, time',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="d_m_t" />'
		}, {
			id: 'small',
			name: 'Default',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="small" />'
		}, {
			id: 'icon',
			name: 'Icon',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="icon"/>'
		}, {
			id: 'plain_text',
			name: 'Plain text',
			content: () =>
				'<gh-date-input class="gh-date-input" gh-field-model="field_model" gh-model="field_model.field_value" gh-mode="plain_text"/>'
		}, {
			id: 'value',
			name: 'Value',
			content: () => {
				const defaultDateFormat = 'yyyy/M/dd h:m:s';
				const dateFormat = fieldModel.data_model.date_format;
				if(!fieldValue) return '';
				let date = new Date(+fieldValue);

				if (!dateFormat) {
					let formatedDate = format(date, defaultDateFormat);
					return formatedDate
				}

				let formatedDate = format(date, dateFormat);

				return formatedDate;
			}
		}];
	}

	getSettings(scope, settingType) {
		return [{
			title: 'Options',
			type: 'general_setting',
			icon: 'menu',
			columns_list: [
				[{
					type: 'ghElement',
					property: 'data_model.time_picker',
					data_model: function () {
						return {
							field_name: 'Time Picker',
							name_space: 'time_picker',
							data_type: 'boolean'
						};
					}
				}, {
					type: 'ghElement',
					property: 'data_model.data_range',
					data_model: function () {
						return {
							field_name: 'Date Range',
							name_space: 'date_range',
							data_type: 'boolean'
						};
					}
				}], [{
					title: 'Time Format',
					type: 'header'
				}, {
					type: 'ghElement',
					property: 'data_model.hour_format',
					data_model: function () {
						return {
							data_model: {
								interpretation: [{
									src: 'form',
									settings: {
										show_field_name: 0
									}
								}],
								options: [{
									name: 'PM/AM',
									icon: '12_AM',
									color: '#d1d8dd',
									value: 'hh'
								}, {
									name: '24 hours',
									icon: '24_00',
									color: '#d1d8dd',
									value: 'HH'
								}],
								show_field_name: false
							},
							data_type: 'radio_icon'
						};
					}
				}], [{
					title: 'Default Value Settings',
					type: 'header'
				}, {
					type: 'ghElement',
					property: 'data_model.use_default_value',
					data_model: function () {
						return {
							field_name: 'Use default value',
							name_space: 'use_default_value',
							data_type: 'boolean'
						};
					}
				}, {
					type: 'ghElement',
					property: 'data_model.dafault_value',
					showIf: 'data_model.use_default_value',
					data_model: function () {
						return {
							data_model: {
								options: [{
									name: 'Today',
									tense: 'current',
									value: 'today_current,current'
								}, {
									name: 'Tomorrow',
									value: 'tomorrow,future'
								}, {
									name: 'Next 7 days',
									value: '7_days_future,future'
								}, {
									name: 'Next 10 days',
									value: '10_days_future,future'
								},
								{
									name: 'Next 14 days',
									value: '14_days_future,future'
								}, {
									name: 'Next 30 days',
									value: '30_days_future,future'
								}, {
									name: 'Next Calendar Year',
									value: 'year_future,future'
								}, {
									name: 'Yesterday',
									value: 'yesterday,past'
								}, {
									name: 'Past 7 days',
									value: '7_days_past,past'
								},
								{
									name: 'Past 10 days',
									value: '10_days_past,past'
								},
								{
									name: 'Past 14 days',
									value: '14_days_past,past'
								}, {
									name: 'Past 30 days',
									value: '30_days_past,past'
								}, {
									name: 'Past Calendar Year',
									value: 'year_past,past'
								}]
							},
							field_name: 'Default Value',
							name_space: 'default_value',
							data_type: 'text_opt'
						};
					}
				}]
			]
		},
		{
			title: 'Style',
			icon: 'eye',
			type: 'interpretation_setting',
			columns_list: [
				[
					{
						title: 'Date format for interpretation',
						type: 'header'
					},
					{
						type: 'ghElement',
						property: 'data_model.date_format',
						data_model: function () {
							return {
								field_name: 'Format',
								data_type: 'text',
								data_model: {
									tooltip: {
										default: '<h3>Format</h3>Enter date format in (yyyy/M/d) format',
									}
								}
							}
						}
					},
					{
						type: 'ghElement',
						property: 'data_model.date_format',
						data_model: function () {
							return {
								field_name: 'Format options',
								data_type: 'text_opt',
								data_model: {
									tooltip: {
										default: '<h3>Format</h3>Pick date format from list',
									},
									options: [{
										value: 'yyyy/M/dd h:m:s',
										name: '2020/6/22 16:30:45 (Default)'
									}, {
										value: 'dd.MM.yyyy',
										name: '22.06.2020'
									},
									{
										value: 'MM-dd-yyyy',
										name: '06-22-2020'
									},
									{
										value: 'dd.MM h:mm',
										name: '22.06 16:30'
									},
									{
										value: 'dd.MM.yyyy hh:mm',
										name: '22.06.2020 16:30'
									}]
								},
							};
						}
					}
				]
			]
		}];
	}

	getDefaultValue(fieldModel, valuesArray) {
		return new Promise(resolve => {
			function defaultValueFromService(name, tense) {
				var result = {
					start_date: null,
					end_date: null
				};
				var dateResult;
				var date = GetDropdownValues.getDatesPair(name, tense, !fieldModel.data_model.data_range);
				if (fieldModel.data_model.data_range) {
					date = date.split(':');
					result.start_date = date[0];
					result.end_date = date[1];
					dateResult = result.start_date.valueOf().toString() + ':' + result.end_date.valueOf().toString();
				} else {
					dateResult = date.valueOf().toString();
				}
				return dateResult
			}
			for (var i = 0; i < valuesArray.length; i++) {
				if (valuesArray[i] == null) {
					if (fieldModel.data_model.dafault_value) {
						let dateDefault = fieldModel.data_model.dafault_value.split(',');
						console.log(dateDefault);
						if (dateDefault.length == 1) {
							valuesArray[i] = defaultValueFromService('today_current', 'current');
						} else {
							valuesArray[i] = defaultValueFromService(dateDefault[0], dateDefault[1]);
							console.log(valuesArray[i]);
						}
					} else {
						valuesArray[i] = defaultValueFromService('today_current', 'current');
					}
				}
				if (valuesArray.length == i + 1) {
					resolve(valuesArray);
				}
			}
		})
	}
};

angular.module('dateData', [
	'ghDateInputModule'
]).factory('date', function () {
	const dateData = new DateData();
	return {
		filter: dateData.filter,
		getTemplate: function () {
			return dateData.getTemplate();
		},
		getSettings: function (scope, settingType) {
			return dateData.getSettings(scope, settingType);
		},
		getInterpretation: function (gudhub, fieldValue, appId, itemId, fieldModel) {
			return dateData.getInterpretation(gudhub, fieldValue, appId, itemId, fieldModel);
		},
		getDefaultValue: function (fieldModel, valuesArray) {
			return dateData.getDefaultValue(fieldModel, valuesArray);
		}
	};
});
