#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct Contact {
    char name[50];
    char phone[11]; // 10 digits + 1 for null-terminator
    struct Contact* next;
} Contact;

Contact* createContact(char* name, char* phone) {
    Contact* newContact = (Contact*)malloc(sizeof(Contact));
    strcpy(newContact->name, name);
    strcpy(newContact->phone, phone);
    newContact->next = NULL;
    return newContact;
}

void addContact(Contact** head, char* name, char* phone) {
    Contact* newContact = createContact(name, phone);
    newContact->next = *head;
    *head = newContact;
    printf("Contact added: %s, %s\n", name, phone);
}

void deleteContact(Contact** head, char* name) {
    Contact* temp = *head, *prev = NULL;
    while (temp != NULL && strcmp(temp->name, name) != 0) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) {
        printf("Contact not found: %s\n", name);
        return;
    }

    if (prev == NULL)
        *head = temp->next;
    else
        prev->next = temp->next;

    free(temp);
    printf("Contact deleted: %s\n", name);
}

void displayContacts(Contact* head) {
    if (head == NULL) {
        printf("No contacts in the list.\n");
        return;
    }
    
    Contact* current = head;
    printf("Contact List:\n");
    while (current != NULL) {
        printf("Name: %s, Phone: %s\n", current->name, current->phone);
        current = current->next;
    }
}

int isValidPhoneNumber(char* phone) {
    // Remove any newline characters that might have been read by fgets
    phone[strcspn(phone, "\n")] = 0;

    // Check if the length is exactly 10 digits
    if (strlen(phone) != 10) {
        return 0; // Not exactly 10 digits
    }
    // Check if all characters are digits
    for (int i = 0; i < 10; i++) {
        if (!isdigit(phone[i])) {
            return 0; // Non-digit character found
        }
    }
    return 1;
}

int main() {
    Contact* contactList = NULL;
    int choice;
    char name[50], phone[11];

    do {
        printf("\n1. Add Contact\n2. Delete Contact\n3. Display Contacts\n4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        getchar();  // To consume the newline character after entering choice

        switch (choice) {
            case 1:
                printf("Enter contact name: ");
                fgets(name, sizeof(name), stdin);
                name[strcspn(name, "\n")] = 0;  // Remove newline character
                
                printf("Enter contact phone (10 digits): ");
                fgets(phone, sizeof(phone), stdin);
                
                if (isValidPhoneNumber(phone)) {
                    addContact(&contactList, name, phone);
                } else {
                    printf("Invalid phone number. It must be exactly 10 digits.\n");
                }
                break;
            case 2:
                printf("Enter contact name to delete: ");
                fgets(name, sizeof(name), stdin);
                name[strcspn(name, "\n")] = 0;  // Remove newline character
                deleteContact(&contactList, name);
                break;
            case 3:
                displayContacts(contactList);
                break;
            case 4:
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    } while (choice != 4);

    return 0;
}
