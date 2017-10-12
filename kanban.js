$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card...');

            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Enter the name of the card") || 'Card'));
            });

            $column.append($columnTitle)
                   .append($columnAddCard)
                   .append($columnDelete)
                   .append($columnCardList);

            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    }

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');

            $cardDelete.click(function(){
                self.removeCard();
            });

            $card.append($cardDescription)
                 .append($cardDelete);

            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    function Board(name) {
        var self = this;

        this.id = randomString();
        this.name = name;
        this.$element = createBoard();

        function createBoard() {
            var $board = $('<div>').addClass('board');
            var $boardTitle = $('<h1>').text(self.name);
            var $boardDelete = $('<button>').addClass('btn-delete').text('x');
            var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
            var $boardColumnContainer = $('<div>').addClass('column-container');

            $boardAddColumn.click(function() {
                self.addColumn(new Column(prompt('Enter the name of the column') || 'Column'));
            });

            $boardDelete.click(function() {
                self.removeBoard();
            })

            $board.append($boardTitle)
                  .append($boardDelete)
                  .append($boardAddColumn)
                  .append($boardColumnContainer)

            return $board
        }
    }

    Board.prototype = {
        addColumn: function(column) {
            this.$element.children('.column-container').append(column.$element);
            initSortable();
        },
        removeBoard: function() {
            this.$element.remove();
        }
    }

    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
      }

    $('.create-board').click(function() {
        var name = prompt('Enter a board name') || 'Board';
        var board = new Board(name);
            $('#main').append(board.$element);
    });
});