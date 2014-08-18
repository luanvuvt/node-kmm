# Kmm (Kuler Module Manager)
> Create symbolic link from repository folder to CMS folder.

### How to use it

1. Install globally with `npm install -g kmm`.
2. Write your `kmmfile`.
3. Run `kmm` in your project directory.
4. The rest is up to you.

#### Options
- `--cwd` specify the working directory to run kmm
- `--kmmfile` specify an exact kmmfile path

### Examples

#### kmmfile.json
```json
{
	"items": [
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_cp",
			"linkFolders": ["admin/view/kuler/bootstrap", "admin/view/kuler/asset", "admin/view/kuler/angular", "admin/view/kuler/ckeditor"]
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/simplicity/v155x_v156x/src",
			"linkFolders": ["admin/view/image/simplicity", "catalog/view/theme/simplicity"]
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_advanced_html"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_tabs"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_slides"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_accordion"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_blog_manager"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_filter"
		},
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_menu"
		},
        {
            "path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_layer_slider"
        },
		{
			"path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_contact_form"
		},
        {
            "path": "W:/Work/Dc/Projects/Opencart/repos/opencart-modules/v2/kuler_showcase"
        }
	]
}
```
To run:
`kmm`