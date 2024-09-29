# Schema Explanation

[[toc]]

## Models

### User

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  username  String   @unique
  email     String   @unique
  password  String
  books     Book[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- **id**: Unique identifier for the user, generated using `cuid()`.
- **name**: Name of the user.
- **username**: Unique username for the user.
- **email**: Unique email address for the user.
- **password**: Password for user authentication.
- **books**: A list of books created by the user.
- **createdAt**: Timestamp when the user was created.
- **updatedAt**: Timestamp when the user was last updated.

### Book

```prisma
model Book {
  id        String   @id @default(uuid())
  title     String
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  sections  Section[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- **id**: Unique identifier for the book, generated using `uuid()`.
- **title**: Title of the book.
- **user**: Relation to the `User` model, indicating which user created the book.
- **userId**: Foreign key referencing the `User` model's `id`.
- **sections**: A list of sections within the book.
- **createdAt**: Timestamp when the book was created.
- **updatedAt**: Timestamp when the book was last updated.

### Section

```prisma
model Section {
  id        String   @id @default(uuid())
  title     String
  book      Book     @relation(fields: [bookId], references: [id])
  bookId    String
  notes     Note[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- **id**: Unique identifier for the section, generated using `uuid()`.
- **title**: Title of the section.
- **book**: Relation to the `Book` model, indicating which book contains this section.
- **bookId**: Foreign key referencing the `Book` model's `id`.
- **notes**: A list of notes within the section.
- **createdAt**: Timestamp when the section was created.
- **updatedAt**: Timestamp when the section was last updated.

### Note

```prisma
model Note {
  id        String   @id @default(uuid())
  section   Section  @relation(fields: [sectionId], references: [id])
  sectionId String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- **id**: Unique identifier for the note, generated using `uuid()`.
- **section**: Relation to the `Section` model, indicating which section contains this note.
- **sectionId**: Foreign key referencing the `Section` model's `id`.
- **createdAt**: Timestamp when the note was created.
- **updatedAt**: Timestamp when the note was last updated.

## Future Implementation: NoteVersion

The `NoteVersion` model is commented out for future implementation. It is intended to keep track of the note's commit history, storing different versions of a note over time.

```prisma
// model NoteVersion {
//   id        Int      @id @default(autoincrement())
//   note      Note     @relation(fields: [noteId], references: [id])
//   noteId    Int
//   content   String
//   version   Int
//   createdAt DateTime @default(now())
// }
```

- **id**: Unique identifier for the note version, generated using auto-increment.
- **note**: Relation to the `Note` model, indicating which note this version belongs to.
- **noteId**: Foreign key referencing the `Note` model's `id`.
- **content**: Content of the note version.
- **version**: Version number of the note.
- **createdAt**: Timestamp when the note version was created.
