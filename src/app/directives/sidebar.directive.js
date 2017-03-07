(function () {
    'use strict';

    angular
        .module('app.directives')
        .directive('sidebar', sideBar);

    /*
     эффект меню - sidebar-lpanel-effect="push|overlay|shrink"
     тип меню - sidebar-navigtaion-type="vertical|vertical-compact|horizontal"
     расположение sidebar-nav-placement="left|right"
     горизонтальное компактное меню - добавить класс .compact-hmenu to wrapper
     */
    function sideBar($timeout, $window) {
        return {
            link: link,
            restrict: 'AE'
        };

        function link(scope, el, atts) {
            $timeout(function () {

                // active state menu
                el.find('.panel-list li > a').on('click', function () {
                    if ($('body').attr('sidebar-navigation-type') == 'vertical' || $('body').attr('sidebar-navigation-type') == 'vertical-compact') {
                        if ($(this).parent('li.sidebar-has-menu').length === 0) {
                            $(this).parents('.panel-list').find('li.active').removeClass('active');
                            $(this).parent().addClass('active');
                        }
                    }
                });

                // submenu
                el.find('.sidebar-has-menu > a').on('click', function () {
                    if ($(this).closest('.sidebar-minimized-lpanel').length === 0) {

                        $(this).parent('.sidebar-has-menu').parent('ul').find('ul:visible').slideUp('fast');
                        $(this).parent('.sidebar-has-menu').parent('ul').find('.opened').removeClass('opened');

                        var subMenu = $(this).parent('.sidebar-has-menu').find('>.sidebar-sub-menu');

                        if (subMenu.is(':hidden')) {
                            subMenu.slideDown('fast');
                            $(this).parent('.sidebar-has-menu').addClass('opened');
                        } else {
                            $(this).parent('.sidebar-has-menu').parent('ul').find('ul:visible').slideUp('fast');
                            $(this).parent('.sidebar-has-menu').removeClass('opened');
                        }

                    }
                });

                // toggle
                $('.sidebar-toggle a').on('click', function () {

                    if ($('#sidebar-wrapper').attr('sidebar-device-type') !== 'phone') {
                        $('#sidebar-container').toggleClass('sidebar-minimized-lpanel');
                        $('#sidebar-header').toggleClass('sidebar-minimized-lpanel');
                        if ($('body').attr('sidebar-navigation-type') !== 'vertical-compact') {
                            $('body').attr('sidebar-navigation-type', 'vertical-compact')
                        } else {
                            $('body').attr('sidebar-navigation-type', 'vertical')
                        }
                    } else {
                        if (!$('#sidebar-wrapper').hasClass('sidebar-hide-lpanel')) {
                            $('#sidebar-wrapper').addClass('sidebar-hide-lpanel')
                        } else {
                            $('#sidebar-wrapper').removeClass('sidebar-hide-lpanel')
                        }
                    }

                });

                function resizeWrapper() {
                    var windowInnerWidth = $window.innerWidth;
                    if (windowInnerWidth >= 768 && windowInnerWidth <= 1024) {
                        $('#sidebar-wrapper').attr('sidebar-device-type', 'tablet');
                        $('#sidebar-header, #sidebar-container').addClass('sidebar-minimized-lpanel');

                        $('#sidebar-container').attr('sidebar-lpanel-effect','overlay');
                    } else {
                        if (windowInnerWidth < 768) {
                            $('#sidebar-wrapper').attr('sidebar-device-type', 'phone');
                            $('#sidebar-header, #sidebar-container').removeClass('sidebar-minimized-lpanel');

                            $('#sidebar-container').attr('sidebar-lpanel-effect','overlay');
                        } else {
                            if ($('body').attr('sidebar-navigation-type') !== 'vertical-compact') {
                                $('#sidebar-wrapper').attr('sidebar-device-type', 'desktop');
                                $('#sidebar-header, #sidebar-container').removeClass('sidebar-minimized-lpanel');
                            } else {
                                $('#sidebar-wrapper').attr('sidebar-device-type', 'desktop');
                                $('#sidebar-header, #sidebar-container').addClass('sidebar-minimized-lpanel');
                            }

                            $('#sidebar-container').removeAttr('sidebar-lpanel-effect');
                        }
                    }
                }

                function resizeMainContent() {
                    $('#main-content ').css('min-height', $(window).height() - $('#sidebar-header').innerHeight() - 2);
                }

                resizeWrapper();
                resizeMainContent();

                angular.element($window).bind('resize', function () {
                    resizeWrapper();
                    resizeMainContent();
                });


            }, 0);
        }
    }
})();