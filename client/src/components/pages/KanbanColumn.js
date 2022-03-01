import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'

const itemsFromBackEnd = [
  { id: uuidv4(), content: 'First task' },
  { id: uuidv4(), content: 'Second task' },
]

const columnsFromBackEnd =
{
  [uuidv4()]: {
    name: 'Todo',
    items: itemsFromBackEnd
  }
}

const onDragEnd = (e, columns, setColumns) => {
  if (!e.destination) return
  const { source, destination } = e
  const column = columns[source.droppableId]
  const copiedItems = [...column.items]
  const [removed] = copiedItems.splice(source.index, 1)
  copiedItems.splice(destination.index, 0, removed)
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
}

const KanbanColumn = ({ isDragging, text }) => {
  const [columns, setColumns] = useState(columnsFromBackEnd)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={e => onDragEnd(e, columns, setColumns)}>
        {Object.entries(columns).map((([id, column]) => {
          return (
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey', padding: 4, width: 250, minHeight: 500 }}>
                  {column.items.map((item, i) => {
                    return (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                color: 'white',
                                ...provided.draggableProps.style
                              }}>
                              {item.content}
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              }}
            </Droppable>
          )
        }))}
      </DragDropContext>
    </div>
  )
}

export default KanbanColumn