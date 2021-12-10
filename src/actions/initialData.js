export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnorder: ['column-1', 'column-2', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'To do column',
          cardorder: [
            'card-1',
            'card-2',
            'card-3',
            'card-4',
            'card-5',
            'card-6'
          ],
          cards: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 1',
              cover:
                'https://pbs.twimg.com/media/EvdRuL3UUAAE5se?format=jpg&name=4096x4096'
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 2',
              cover: null
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 3',
              cover: null
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 4',
              cover: null
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 5',
              cover: null
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title of card 6',
              cover: null
            }
          ]
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'Finish column',
          cardorder: ['card-10', 'card-11', 'card-12', 'card-13', 'card-14', 'card-15', 'card-16', 'card-17', 'card-18'],
          cards: [
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 10',
              cover:
                'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            },
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 11',
              cover: null
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 12',
              cover: null
            },
            {
              id: 'card-13',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 13',
              cover: null
            },
            {
              id: 'card-14',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 14',
              cover: 'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            },
            {
              id: 'card-15',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 15',
              cover: 'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            },
            {
              id: 'card-16',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 16',
              cover: 'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            },
            {
              id: 'card-17',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 17',
              cover: 'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            },
            {
              id: 'card-18',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title of card 18',
              cover: 'https://preview.redd.it/5afmy0bn40p71.jpg?width=640&crop=smart&auto=webp&s=479a030124dad2655b168d703cab933aef2b6641'
            }
          ]
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'In progress column',
          cardorder: ['card-7', 'card-8', 'card-9'],
          cards: [
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 7',
              cover: 'https://i.ytimg.com/vi/D-c0-sPclkE/maxresdefault.jpg'
            },
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 8',
              cover: null
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title of card 9',
              cover: null
            }
          ]
        }
      ]
    }
  ]
}
