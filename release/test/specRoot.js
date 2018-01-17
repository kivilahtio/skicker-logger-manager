/* Maybe some day use dependency management for Jasmine
require('../node_modules/jasmine-core/lib/jasmine-core/jasmine.css');
require('../node_modules/jasmine-core/lib/jasmine-core/jasmine.js');
require('../node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js');
require('../node_modules/jasmine-core/lib/jasmine-core/json2.js');
require('../node_modules/jasmine-core/lib/jasmine-core/boot.js');
*/
const requireAll = (requireContext) => { requireContext.keys().map(requireContext); };
requireAll(require.context("./helpers/", true, /\.ts$/));
requireAll(require.context("./", true, /[sS]pec\.ts$/));
//# sourceMappingURL=specRoot.js.map