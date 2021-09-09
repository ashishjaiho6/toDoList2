
var app = angular.module('todoApp', []);

app.controller('todoList', function ($scope) {

    $scope.todos = [
    ];
    $scope.dispTheme = false;
    $scope.themes = [
        { name: "spaaace", pos: 0, sel: '' },
        { name: "wood", pos: 1, sel: '' },
        { name: "brick", pos: 2, sel: '' },
        { name: "fuego", pos: 3, sel: '' },
        { name: "nature", pos: 4, sel: '' },
        { name: "painted", pos: 5, sel: '' },
        { name: "waves", pos: 6, sel: '' },
        { name: "sky", pos: 7, sel: '' },
        { name: "urban", pos: 8, sel: '' },
        { name: "desert", pos: 9, sel: '' }
    ];
    $scope.curTheme = $scope.themes[Math.floor(Math.random() * $scope.themes.length)];
    $scope.todoText = "";

    $scope.myFunc = function () {
        if (!event.target.matches("#dropbutt")) {
            $scope.dispTheme = false;
        }
    }
    $scope.changeTheme = function () {
        $scope.themes[$scope.curTheme.pos].sel = ''
        $scope.curTheme = $scope.themes[($scope.curTheme.pos + 1) % $scope.themes.length];
    }
    $scope.setTheme = function (x) {
        $scope.themes[$scope.curTheme.pos].sel = ''
        $scope.curTheme = $scope.themes[x];
        $scope.themes[x].sel = 'y';
        $scope.dispTheme = false;
    }
    $scope.showThemes = function () {
        if (!$scope.dispTheme) {
            $scope.dispTheme = true;
        }
        else { $scope.dispTheme = false; }
    }

    $scope.doStuff = function () {
        $scope.todos = [
            { text: "Things", done: true, pos: 0 },
            { text: "Stuff", done: false, pos: 1 }
        ]
        $scope.addTodo();
        $scope.curTheme.sel = 'y';
        /* edit and delete don't work until after the first call of addTodo. */
        // alert("Ashish Gupta toDo List");
    }

    $scope.reorder = function () {
        for (y in $scope.todos) {
            $scope.todos[y].pos = y;
        }
    }

    $scope.remAll = function () {
        if ($scope.todos.length > 0) {
            var conf = confirm("Really delete all items?");
        }
        if (conf) {
            $scope.todos = [];
        }
    }

    $scope.remSelected = function () {
        for (var y = $scope.todos.length - 1; y >= 0; y--) {
            if ($scope.todos[y].done == true) {
                $scope.todos.splice(y, 1);
            }
        }
        $scope.reorder();
    }

    $scope.addTodo = function () {
        if ($scope.todoText !== '') {
            $scope.todos.push({ text: $scope.todoText, done: false, pos: $scope.todos.length });
            $scope.todoText = '';
        }

        $scope.editTodo = function (x) {
            val = prompt("Edit Item", $scope.todos[x].text);
            if ((val != "") && (val != null)) {
                $scope.todos[x].text = val;
            }
        }

        $scope.delTodo = function (x) {
            var yes = true;
            if ($scope.todos[x].done == false) {
                yes = confirm("Delete incomplete item?")
            }
            if (yes) {
                $scope.todos.splice(x, 1);
            }
            $scope.reorder();
        }
    };
});
