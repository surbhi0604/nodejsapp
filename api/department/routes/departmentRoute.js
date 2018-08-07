import departmentController from '../controller/departmentController';

module.exports = function(app)
{
    app.route('/api/department/create').post(departmentController.createDepartment);

    app.route('/api/department/list').get(departmentController.listDepartment);

    app.route('/api/department/search').post(departmentController.searchDepartment);

    app.route('/api/department/delete/:id').get(departmentController.deleteDepartment);

    app.route('/api/department/update').post(departmentController.updateDepartment);
}
