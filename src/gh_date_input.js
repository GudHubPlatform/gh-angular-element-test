angular.module('ghDateInputModule', [])

.directive('ghDatePicker', [function() {
    return {
        scope: {
            model: '=',
            timePicker: '=',
	          position: '=',
            saveCallback: '&'
        },

        controller: ['$scope', function($scope){
            
            if($scope.model){
                var date_model = new Date(Number($scope.model));
                var time = getDateMilliseconds(date_model);

                $scope.newDateValue = new Date(time);
                $scope.arr = [date_model.getHours(), date_model.getMinutes()];
            } else {
                var date_model = new Date();
                var time = getDateMilliseconds(date_model);

                $scope.newDateValue = new Date(time);
                $scope.arr = [0, 0];
            }

            $scope.today = function(){
                $scope.newDateValue = new Date();
                $scope.arr = [$scope.newDateValue.getHours(), $scope.newDateValue.getMinutes()];

                $scope.apply();
            };

            $scope.clear = function(){
                $scope.saveCallback({
                    ms: ''
                });
            };

            $scope.cancel = function(){
                $scope.saveCallback({
                    ms: $scope.model
                });
            };

            $scope.apply = function(){
                var hours = $scope.arr[0] * 3600000;
                var minutes = $scope.arr[1] * 60000;

                var date = new Date($scope.newDateValue);
                var ms = getDateMilliseconds(date);

                $scope.saveCallback({
                    ms: ms + hours + minutes
                });
            };

            function getDateMilliseconds(date) {
                var hours = date.getHours() * 3600000;
                var minutes = date.getMinutes() * 60000;
                var all_ms = date.getTime();

                return all_ms - hours - minutes;
            }
        }],

        template:
            '<div class="date-picker date-picker-block" ng-style="position">'+
                '<md-calendar ng-model="newDateValue"></md-calendar>'+
                '<div ng-if="timePicker" class="duration-picker-container">'+
                    '<gh-duration-input step="1" type="hours" model="arr[0]"></gh-duration-input>'+
                    '<span class="twoDots">:</span>'+
                    '<gh-duration-input step="5" type="minutes" model="arr[1]"></gh-duration-input>'+
                '</div>'+
                '<div class="date-picker-buttons">'+
                    '<button ng-click="today()"><div gh-icon="duration 0791d0 20px auto normal"></div>Today</button>'+
                    '<button ng-click="cancel()"><div gh-icon="cross 0791d0 20px auto normal"></div>Cancel</button>'+
                    '<button ng-click="clear()"><div gh-icon="rubbish 0791d0 20px auto normal"></div>Clear</button>'+
                    '<button ng-click="apply()"><div gh-icon="checked 0791d0 20px auto normal"></div>Apply</button>'+
                '</div>'+
            '</div>'
    };
}])

.directive('ghDateInput', ['$document','getDropdownValues','$compile', function($document,getDropdownValues,$compile) {
    var directive = {};

    directive.scope = {
        ghFieldModel: '=',
        ghModel: '=',  
        ghMode: '@',   //small, plain_text, d_m_t, d_w_m_y
        datarange:'@',
        editable: '@'

    };
    directive.controller = ['$scope', function($scope) {
        
        $scope.calendar_show = false;
        $scope.datarange =  $scope.datarange ?  $scope.datarange : $scope.ghFieldModel.data_model.data_range;
        $scope.editable =  $scope.editable ?  $scope.editable : $scope.ghFieldModel.settings.editable;
        
            $scope.show_data_dropdown = true;
            $scope.range_dropdown = getDropdownValues.getDateDropdownOptions(); //
            $scope.position = {
                'top': '0px',
                'left': '0px'
            };

            // gh-Model 
            if(typeof $scope.ghModel == "number"){
                $scope.ghModel = String($scope.ghModel)
            }

            // check if Range is on
            if ($scope.datarange){

                // check change range dropdown
                $scope.$watch('typeDataDropdown',function(type){ 
                    if(type !== undefined){
                        $scope.ghModel = type;
                        $scope.modelsValue = type.split(':');
                        $scope.show_data_dropdown = false;
                    }
                });
                // check if we have any value
                if($scope.ghModel &&  $scope.ghModel.indexOf(':') > 0){
                    $scope.show_data_dropdown = false;
                    $scope.modelsValue = $scope.ghModel.split(':');
                }
            }else{// when we come back to the input we make it empty 
                if($scope.ghModel && $scope.ghModel.indexOf(':') > 0 ){
                    $scope.ghModel = '';
                }
            }


            $scope.calendar_switch = function (event,index) {
                    let height_element = $scope.ghFieldModel.data_model.time_picker ? 570 : 450;
                    let width_element = 320;
    
                    let height_window = window.innerHeight;
                    let width_window = window.innerWidth;
    
                    $scope.position.top = event.clientY + "px";
                    $scope.position.left = event.clientX + "px";
    
                    if (event.clientY + height_element > height_window) {
                        $scope.position.top = height_window - height_element + "px";
                    }
    
                    if (event.clientX + width_element > width_window) {
                        $scope.position.left = width_window - width_element + "px";
                    }
    
                    //-----------------------------------------------------
                    $scope.indexDataRange = index;
                    $scope.calendar_show = !$scope.calendar_show;
                    

                    if($scope.datarange){
                        $scope.newDateValue = $scope.ghModel.split(':')[index];
                    }else{
                        $scope.newDateValue = $scope.ghModel;
                    }
                    
            };
        
            $scope.save = function (ms) {
                
                if( $scope.datarange){
                    $scope.modelsValue[$scope.indexDataRange]  = ms; // when we know what the value we shoud change 
                    $scope.ghModel = $scope.modelsValue[0] + ":" + $scope.modelsValue[1]; 
                     
                } else{
                    $scope.ghModel = ms;
                }
                
                $scope.calendar_show = false;
            };
            
          

            $scope.deleteDataRange = function(){
                $scope.show_data_dropdown = true;
                $scope.ghModel = [];
                $scope.typeDataDropdown = undefined;
            }
    }];

       
    directive.link = function(scope, iElement){
        
        var dataInputEditable = '<gh-date-rendering  ng-click="calendar_switch($event)" gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="ghModel"></gh-date-rendering>'+
                                '<gh-date-picker ng-if="calendar_show" position="position" save-callback="save(ms)" model="newDateValue" time-picker="ghFieldModel.data_model.time_picker"></gh-date-picker>';

        // var dataInput = '<gh-date-rendering  gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="ghModel"></gh-date-rendering>';
        var dataInput = '<gh-date-rendering  gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="ghModel"></gh-date-rendering>';

        var dataRangeEitable =  '<gh-input ng-show="show_data_dropdown" gh-dropdown="range_dropdown" gh-data-type="text_opt" type="text" ng-model="typeDataDropdown" class="gh-field_value"></gh-input>'+
                                '<div ng-hide="show_data_dropdown" class="data_range-repaet colon">'+
                                    '<gh-date-rendering ng-click="calendar_switch($event,0)" gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="modelsValue[0]"></gh-date-rendering>'+
                                    '<gh-date-rendering ng-click="calendar_switch($event,1)" gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="modelsValue[1]"></gh-date-rendering>'+
                                    '<span class="show_data_dropdown" ng-click="deleteDataRange()" gh-icon="cancel a0a7ad 30px auto normal"></span>'+
                                '</div>'+
                                '<gh-date-picker ng-if="calendar_show" position="position" save-callback="save(ms)" model="newDateValue" time-picker="ghFieldModel.data_model.time_picker"></gh-date-picker>';
        
        var dataRange = '<div class="data_range-repaet">'+
                            '<gh-date-rendering  gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="modelsValue[0]"></gh-date-rendering>'+
                            '<gh-date-rendering  gh-field-model="ghFieldModel" gh-mode="ghMode" gh-model="modelsValue[1]"></gh-date-rendering>'+
                        '</div>';
                   
        var insideHtml = '';
    
        if ( scope.editable ){

            if(scope.datarange){
                insideHtml = dataRangeEitable;
            }else{
                insideHtml = dataInputEditable;
            }

        }else {

            if(scope.datarange){
                insideHtml = dataRange;
            }else{
                insideHtml = dataInput;
            }
        }


        
        var template = '<div class="current-date">'+ insideHtml +'</div>';

        function renderData() {
           var el = angular.element(template);
           iElement.empty();
           iElement.append($compile(el)(scope));
        }
        
            renderData();
        };
    return directive;
}])



.directive('ghDateInputRange', [function() {
    return {
        scope: {
            ghFieldModel: '=',
            ghModel: '='
        },

        controller: ['$scope', function($scope){
            $scope.models = new Array(2);

            function setValue(args) {
                if (args[0] && args[1]) {
                    $scope.ghModel = String(args[0]) + ':' + String(args[1]);
                }
            }

            $scope.$watchCollection('models', function(n, o) {
                if (n != o) {
                    setValue($scope.models);
                }
            });
        }],

        template:
            '<gh-date-input class="gh-date-input" gh-field-model="ghFieldModel" gh-model="models[0]" gh-mode="plain_text"  size="small"></gh-date-input>'+
            '<p style="display: inline-block; color: rgb(213, 213, 227); padding: 0 5px"> — </p>'+
            '<gh-date-input class="gh-date-input" gh-field-model="ghFieldModel" gh-model="models[1]" gh-mode="plain_text"  size="small"></gh-date-input>',
    };
}])

.directive('ghDateRendering', [function() {
    return {
        scope: {
            ghFieldModel: '=',
            ghMode: '=',
            ghModel: '='
        },

        controller: ['$scope','getDropdownValues', function($scope,getDropdownValues){
            $scope.showTime = false;
            if($scope.ghFieldModel.data_model.time_picker){
                $scope.showTime = true;
            }
        }],
        
        template:
           '<div class="gh-date-rendering">'+
           '<div ng-click="calendar_switch($event)" ng-if="!ghModel" class="date-content-placeholder"><p style="padding-top: 14px;">Select date</p></div>'+
           '<div ng-switch="ghMode" ng-hide="!ghModel">'+
            '<div ng-switch-when="small" class="small">'+
                    '<span gh-icon="date_time 0893D2 36px normal"></span>'+
                    '<span>{{ ghModel | date:"d MMM yyyy" }}</span>'+
                    '<div ng-show="showTime" class="border"></div>'+
                    '<div ng-show="showTime">'+
                        '<div class="hours">{{ ghModel | date:ghFieldModel.data_model.hour_format + ":mm" + ( ghFieldModel.data_model.hour_format == \'hh\' ? \' a\' : \'\' ) }}</div>'+
                    '</div>'+
                '</div>'+
                '<div ng-switch-when="icon">'+
                    '<div gh-icon="date_time 0893D2 48px normal"></div>'+
                    '</div>'+
                '<div ng-switch-when="plain_text" class="small">'+
                    '<span>{{ ghModel | date:"d MMM yyyy" }}</span>'+
                    '<div ng-show="showTime" class="border"></div>'+
                    '<div ng-if="showTime">'+
                        '<div class="hours">{{ ghModel | date:ghFieldModel.data_model.hour_format + ":mm" + ( ghFieldModel.data_model.hour_format == \'hh\' ? \' a\' : \'\' ) }}</div>'+
                    '</div>'+
                '</div>'+
                '<div ng-switch-when="d_m_t" class="normal">'+
                    '<div>'+
                        '<div class="day-of-month">{{ ghModel | date:"d" }}</div>'+
                        '<div class="day-of-week">{{ ghModel | date:"MMM" }}</div>'+
                    '</div>'+
                    '<div ng-show="showTime" class="border"></div>'+
                    '<div ng-show="showTime">'+
                        '<div class="hours">{{ ghModel | date:ghFieldModel.data_model.hour_format + ":mm" + ( ghFieldModel.data_model.hour_format == \'hh\' ? \' a\' : \'\' ) }}</div>'+
                    '</div>'+
                '</div>'+
                '<div ng-switch-when="d_w_m_y" class="normal">'+
                    '<div>'+
                        '<div class="day-of-month">{{ ghModel | date:"d" }}</div>'+
                        '<div class="day-of-week">{{ ghModel | date:"EEE" }}</div>'+
                    '</div>'+
                    '<div class="border"></div>'+
                    '<div>'+
                        '<div class="month">{{ ghModel | date:"MMM" }}</div>'+
                        '<div class="month">{{ ghModel | date:"yyyy" }}</div>'+
                    '</div>'+
                    '<div ng-show="showTime" class="border"></div>'+
                    '<div ng-show="showTime">'+
                            '<div class="hours">{{ ghModel | date:ghFieldModel.data_model.hour_format + ":mm" + ( ghFieldModel.data_model.hour_format == \'hh\' ? \' a\' : \'\' ) }}</div>'+
                        '</div>'+
                '</div>'+
                '<div ng-switch-default class="normal">'+
                    '<div>'+
                        '<div class="day-of-month">{{ ghModel | date:"d" }}</div>'+
                        '<div class="day-of-week">{{ ghModel | date:"EEE" }}</div>'+
                    '</div>'+
                    '<div class="border"></div>'+
                    '<div>'+
                        '<div class="month">{{ ghModel | date:"MMM yyyy" }}</div>'+
                    '</div>'+
                    '<div ng-show="showTime" class="border"></div>'+
                    '<div>'+
                        '<div class="hours">{{ ghModel | date:ghFieldModel.data_model.hour_format + ":mm" + ( ghFieldModel.data_model.hour_format == \'hh\' ? \' a\' : \'\' ) }}</div>'+
                    '</div>'+
                '</div>'+
            '</div></div>',
    };
}])