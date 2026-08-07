// --
// OTOBO is a web-based ticketing system for service organisations.
// --
// Copyright (C) 2001-2019 OTRS AG, https://otrs.com/
// Copyright (C) 2019-2026 Rother OSS GmbH, https://otobo.io/
// --
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
// --

"use strict";

var Core = Core || {};
Core.UI = Core.UI || {};

Core.UI.Accessibility = (function (Namespace) {
    Namespace.RunUnitTests = function(){
        QUnit.module('Core.UI.Accessibility');
        QUnit.test('Core.UI.Accessibility.Init()', function(Assert){

            /*
             * Create a div containter for the tests
             */
            var $TestDiv = $('<div id="OTOBO_UI_Accessibility_UnitTest"></div>');
            $TestDiv.append('<div class="ARIARoleBanner"></div>');
            $TestDiv.append('<div class="ARIARoleNavigation"></div>');
            $TestDiv.append('<div class="ARIARoleSearch"></div>');
            $TestDiv.append('<div class="ARIARoleMain"></div>');
            $TestDiv.append('<div class="ARIARoleContentinfo"></div>');
            $TestDiv.append('<div class="ARIAHasPopup"></div>');
            $TestDiv.append('<input type="text" class="Validate_Required" />');
            $TestDiv.append('<input type="text" class="Validate_DependingRequiredAND" />');
            $('body').append($TestDiv);

            /*
             * Run the tests
             */
            Core.UI.Accessibility.Init();

            Assert.expect(11);

            Assert.equal($('.ARIARoleBanner')
                .attr('role'), 'banner', 'Role banner');
            Assert.equal($('.ARIARoleNavigation')
                .attr('role'), 'navigation', 'Role navigation');
            Assert.equal($('.ARIARoleSearch')
                .attr('role'), 'search', 'Role search');
            Assert.equal($('.ARIARoleMain')
                .attr('role'), 'main', 'Role main');
            Assert.equal($('.ARIARoleContentinfo')
                .attr('role'), 'contentinfo', 'Role contentinfo');
            Assert.equal($('.ARIAHasPopup')
                .attr('aria-haspopup'), 'true', 'HasPopup attribute');
            Assert.equal($('.Validate_Required')
                .attr('aria-required'), 'true', 'ARIA required attribute');
            Assert.equal($('.Validate_DependingRequiredAND')
                .attr('aria-required'), 'true', 'ARIA required attribute');
            Assert.equal($('#Accessibility_AlertMessage').length, 1, 'Global alert region exists');
            Assert.equal($('#Accessibility_AlertMessage').attr('role'), 'alert', 'Global alert region has alert role');
            Assert.equal($('#Accessibility_AlertMessage').attr('aria-atomic'), 'true', 'Global alert region is atomic');


            /*
             * Cleanup div container and contents
             */
            $('#OTOBO_UI_Accessibility_UnitTest').remove();
        });

        QUnit.test('Core.UI.Accessibility.AudibleAlert()', function(Assert){
            var Done = Assert.async(),
                AlertElement = $('#Accessibility_AlertMessage')[0];

            Assert.expect(4);

            Assert.equal(
                Core.UI.Accessibility.AudibleAlert('<strong>Error</strong>'),
                true,
                'A non-empty alert is accepted'
            );
            Assert.strictEqual(
                $('#Accessibility_AlertMessage')[0],
                AlertElement,
                'Existing live region is reused'
            );

            window.setTimeout(function () {
                Assert.equal(
                    $('#Accessibility_AlertMessage').text(),
                    '<strong>Error</strong>',
                    'Alert is inserted as plain text'
                );
                Assert.equal(
                    $('#Accessibility_AlertMessage').children().length,
                    0,
                    'Alert text does not create markup'
                );
                Done();
            }, 10);
        });
    };

    return Namespace;
}(Core.UI.Accessibility || {}));
