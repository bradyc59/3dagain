import random

class Property(object):

    def __init__(self, position, name, property_type):
        self.position = position
        self.name = name
        self.property_type = type

class Chance(object):
    def __init__(self):
        self.ChanceDeck = []
        self.create_chance()
        random.shuffle(self.ChanceDeck)

    def chance(self):
        return self.chance()

    def create_chance(self):
        self.ChanceDeck.append("Get out of Jail, Free. This card may be kept until needed or traded.")
        self.ChanceDeck.append("Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.")
        self.ChanceDeck.append("You have been elected president of the SU. Pay each player $50.")
        self.ChanceDeck.append("Go back three spaces.")
        self.ChanceDeck.append("Advance to the nearest Utility.")
        self.ChanceDeck.append("Advance to the nearest campus.")
        self.ChanceDeck.append("You failed an exam. Pay resit fees of $15.")
        self.ChanceDeck.append("Take a trip to Glasnevin Campus. If you pass GO collect $200.")
        self.ChanceDeck.append("Advance to NuBar.")
        self.ChanceDeck.append("Advance to John and Aileen O'Reilly Libary.")
        self.ChanceDeck.append("Your crypto investment matures. Collect $150.")
        self.ChanceDeck.append("Advance to Larkfield.")
        self.ChanceDeck.append("Go to Jail. Do not collect money if you pass go")


class CommunityChest(object):
    def __init__(self):
        self.CommunityChestDeck = []
        self.create_communitychest()
        random.shuffle(self.CommunityChestDeck)

    def communitychest(self):
        return self.communitychest()

    def create_communitychest(self):
        self.CommunityChestDeck.append("Get out of Jail, Free. This card may be kept until needed or sold.")
        self.CommunityChestDeck.append("You have won Mi Soc hotdog eating contest. Collect $10.")
        self.CommunityChestDeck.append("You get SUSI. Collect $100.")
        self.CommunityChestDeck.append("You inherit $100.")
        self.CommunityChestDeck.append("Receive $25 for helping a mate with a project.")
        self.CommunityChestDeck.append("You threw a party in your dorm. Pay damage fees of $100.")
        self.CommunityChestDeck.append("Bank error in your favor. Collect $200.")
        self.CommunityChestDeck.append("You have to buy a book for a new module. Pay $50.")
        self.CommunityChestDeck.append("It is your birthday. Collect $10 from every player.")
        self.CommunityChestDeck.append("Advance to GO (Collect $200).")
        self.CommunityChestDeck.append("You are assessed for street repairs. $40 per house. $115 per hotel.")
        self.CommunityChestDeck.append("Go to Jail. Go directly to Jail. Do not pass GO. Do not collect $200.")


class GameBoard(object):
    def __init__(self):
        self.property = []
        self.create_properties()

    def property(self):
        return self.property

    def property_index(self):
        return self.property[index]


    def create_properties(self):
        self.property.append(Property(0, "Start", FunctionForStart()))  # Function for start would make players collect 200 on pass
        self.property.append(Property(1, "Henry Grattan Building", BuildableProperty(60, 1))) # Function for buildable property has the price of the property passed to it and the Group Number of the property set
        self.property.append(Property(2, "Community Chest", CommunityChestSpace())) # CommunityChestSpace() would be some function for drawing a community chest card and would have driver functions for each individual event
        self.property.append(Property(3, "Albert College", BuildableProperty(60, 1))) # Function for buildable property has the price of the property passed to it and the Group Number of the property set
        self.property.append(Property(4, "Registration Fees", TaxSpace(200))) # Tax function would reduce players money and have amount ot be reduced passed to it based on which square was landed on
        self.property.append(Property(5, "Glasnevin Campus", Campus(200))) # Campus function would be used to assert the price passed to it and deal with instances where player has 1, 2, 3 or 4 of the campuses collectively
        self.property.append(Property(6, "Hamilton Building", BuildableProperty(100, 2))) # Function for buildable property has the price of the property passed to it and the Group Number of the property set
        self.property.append(Property(7, "Chance", ChanceSpace()))
        self.property.append(Property(8, "Terrance Larkin Theatre", BuildableProperty(100, 2)))
        self.property.append(Property(9, "Hampstead", BuildableProperty(120, 2)))
        self.property.append(Property(10, "Jail", JailSpace()))
        self.property.append(Property(11, "Larkfield", BuildableProperty(140, 3)))
        self.property.append(Property(12, "Glasnevin Resturant", Utilities(150)))
        self.property.append(Property(13, "Invent Building", BuildableProperty(140, 3)))
        self.property.append(Property(14, "NCIB Building", BuildableProperty(160, 3)))
        self.property.append(Property(15, "Saint Patricks Campus", Campus(200)))
        self.property.append(Property(16, "Lonsdale Building", BuildableProperty(180, 4)))
        self.property.append(Property(17, "Community Chest", CommunityChestSpace()))
        self.property.append(Property(18, "Stokes Building", BuildableProperty(180, 4)))
        self.property.append(Property(19, "Marconi Building", BuildableProperty(200, 4)))
        self.property.append(Property(20, "Free Parking"))
        self.property.append(Property(21, "DCU Business School", BuildableProperty(220, 5)))
        self.property.append(Property(22, "Chance", ChanceSpace()))
        self.property.append(Property(23, "Inner Faith Center", BuildableProperty(220, 5)))
        self.property.append(Property(24, "John & Aileen O'Reilly Libary", BuildableProperty(240, 5)))
        self.property.append(Property(25, "All Hallows Campus", Campus(200)))
        self.property.append(Property(26, "Eswell Building", BuildableProperty(260, 6)))
        self.property.append(Property(27, "Healthy Living Center", BuildableProperty(260, 6)))
        self.property.append(Property(28, "On Campus Londis", Utilities(150))))
        self.property.append(Property(29, "MacCormac Building", BuildableProperty(280, 6)))
        self.property.append(Property(30, "Go To Jail", GoToJail()))
        self.property.append(Property(31, "McNulty Building", BuildableProperty(300, 7)))
        self.property.append(Property(32, "The Pavillion", BuildableProperty(300, 7)))
        self.property.append(Property(33, "Community Chest" CommunityChestSpace()))
        self.property.append(Property(34, "The Helix", BuildableProperty(320, 7)))
        self.property.append(Property(35, "DCU Sports Complex", Campus(200)))
        self.property.append(Property(36, "Chance", ChanceSpace()))
        self.property.append(Property(37, "The SU Building", BuildableProperty(350, 8)))
        self.property.append(Property(38, "Student Levy", TaxSpace(100)))
        self.property.append(Property(39, "The Nu Bar", BuildableProperty(400, 8)))

def BuildableProperty(cost, groupnumber):
    if groupnumber == 1 or groupnumber == 2:
        houseprice = 50
    elif groupnumber == 3 or groupnumber == 4:
        houseprice = 100
    elif groupnumber == 5 or groupnumber == 6:
        houseprice = 150
    elif groupnumber == 7 or groupnumber == 8:
        houseprice = 200

def CommunityChestSpace():
    # Create an instance of the Class CommunityChest
    # Let variable equal the removed first card from the list using pop()
    # if variable is equal certain string
    # Do certain action


def ChanceSpace():
    # Create an instance of the Class Chest
    # Let variable equal the removed first card from the list using pop()
    # if variable is equal certain string
    # Do certain action
    #i.e if variable = "Go to Jail. Do not collect money if you pass go"
    # GoToJail()

def GoToJail():
    # If playerPosition != 10
    # Then playerPosition = 10
    # Move Player to Jail in the event of Chance, Community Chest that sends to jail or Land on Go to Jail

def Utilities(cost):
    # Some code if player buys space
    # Player money - cost
    # Player Properties [] . append (property(JustBought))

    # Pseudo Code for if Player controlls 1 or 2 Utilities and rent based on roll
    if len(utilities) in PlayerProperties == 1:
        DiceRoll * 4 = Rent
    elif len(utilities) in PlayerProperties == 2:
        DiceRoll * 10 = Rent

def Campus(cost):
    # pseudo Code for when players own Campuses and how it effects rent
    if len(campuses) in PlayerProperties == 1:
        Rent = 50
    elif len(campuses) in PlayerProperties == 2:
        Rent = 100
    elif len(campuses) in PlayerProperties == 3:
        Rent = 150
    elif len(campuses) in PlayerProperties == 4:
        Rent = 200

def TaxSpace(cost):
    # Pseudo Code for event of landing on tax Space
    if playerPosition == 4 or playerPosition == 38:
        playerMoney -= cost

def JailSpace():
    #if the player is in jail
    #initialise a count
    #allow roll
    #if doubles player posiiton += roll
    #elif die1 == die2
    #End Turn
    #if player pays fine
    #playerPosition += roll
    #playerMoney -= 50
    #elif player uses CommunityChest/Chance Get out of Jail Free
    #playerPosition += roll
    #playerProperties -= CommuntiyChest or Chance

def FunctionForStart():
    #Pseudo Code for if player passes Go
    if (playerPosition += roll) % 40 >= 0:
        playerMoney += 200