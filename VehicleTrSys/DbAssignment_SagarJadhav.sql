
CREATE DATABASE [VehicleTrc]  
GO
CREATE TABLE [dbo].[UserMst](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[MobileNo] [bigint] NULL,
	[Organization] [varchar](100) NULL,
	[Address] [varchar](500) NULL,
	[EmailAddress] [varchar](150) NULL,
	[Location] [varchar](150) NULL,
 CONSTRAINT [PK_UserMst] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[VehicleTbl]    Script Date: 17-12-2021 06:08:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[VehicleTbl](
	[VehicleNo] [varchar](50) NOT NULL,
	[VehicleType] [varchar](150) NULL,
	[ChassisNo] [varchar](150) NULL,
	[EngineNo] [varchar](150) NULL,
	[ManufacturerYear] [int] NULL,
	[LoadCarryingCapacity] [int] NULL,
	[MakeOfVehicle] [varchar](100) NULL,
	[ModelNo] [varchar](50) NULL,
	[BodyType] [varchar](90) NULL,
	[OrganizationName] [varchar](100) NULL,
	[DeviceID] [bigint] NULL,
	[UserID] [int] NULL,
 CONSTRAINT [PK_VehicleTbl] PRIMARY KEY CLUSTERED 
(
	[VehicleNo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[VehicleTbl]  WITH CHECK ADD  CONSTRAINT [FK_VehicleTbl_UserMst] FOREIGN KEY([UserID])
REFERENCES [dbo].[UserMst] ([UserID])
GO
ALTER TABLE [dbo].[VehicleTbl] CHECK CONSTRAINT [FK_VehicleTbl_UserMst]
GO
/****** Object:  StoredProcedure [dbo].[Usp_ActionUserVehicle]    Script Date: 17-12-2021 06:08:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Usp_ActionUserVehicle]
		@Action               char(1),
		@UserID               int          =null,
		@Name                 varchar(50)  =null,
		@MobileNo             bigint       =null,
		@Organization         varchar(100) =null,
		@Address              varchar(500) =null,
		@EmailAddress         varchar(150) =null,
		@Location             varchar(150) =null,

		@VehicleNo            varchar(50)  =null,
		@VehicleType          varchar(150) =null,
		@ChassisNo            varchar(150) =null,
		@EngineNo             varchar(150) =null,
		@ManufacturerYear     int          =null,
		@LoadCarryingCapacity int          =null,
		@MakeOfVehicle        varchar(100) =null,
		@ModelNo              varchar(50)  =null,
		@BodyType             varchar(90)  =null,
		@OrganizationName     varchar(100) =null,
		@DeviceID             bigint       =null
AS
BEGIN

	SET NOCOUNT ON;
	IF @Action='I'
	  BEGIN

	  INSERT INTO [dbo].[UserMst]
	  ([Name]
      ,[MobileNo]
      ,[Organization]
      ,[Address]
      ,[EmailAddress]
      ,[Location])
	  VALUES
	  (@Name
	  ,@MobileNo     
	  ,@Organization
	  ,@Address
	  ,@EmailAddress
	  ,@Location)

	
	  INSERT INTO [dbo].[VehicleTbl]
	  ([VehicleNo]
      ,[VehicleType]
      ,[ChassisNo]
      ,[EngineNo]
      ,[ManufacturerYear]
      ,[LoadCarryingCapacity]
      ,[MakeOfVehicle]
      ,[ModelNo]
      ,[BodyType]
      ,[OrganizationName]
      ,[DeviceID]
      ,[UserID])
	  VALUES
	  (@VehicleNo            
	  ,@VehicleType         
      ,@ChassisNo            
	  ,@EngineNo             
	  ,@ManufacturerYear     
	  ,@LoadCarryingCapacity 
	  ,@MakeOfVehicle        
	  ,@ModelNo              
	  ,@BodyType            
	  ,@OrganizationName   
	  ,@DeviceID
	  ,SCOPE_IDENTITY())

	  Select 1 RETURNCODE
	  END
    ELSE
	  BEGIN 
	   
	    IF @UserID IS NOT NULL
		  BEGIN
			 UPDATE [dbo].[UserMst] SET  
			   [Name]=@Name
			  ,[MobileNo]=@MobileNo
			  ,[Organization]=@Organization
			  ,[Address]=@Address
			  ,[EmailAddress]=@EmailAddress
			  ,[Location]=@Location
			 WHERE [UserID]=@UserID
 
			 UPDATE [dbo].[VehicleTbl] SET  
			 --  [VehicleNo]=@VehicleNo
			   [VehicleType]=@VehicleType
			  ,[ChassisNo]=@ChassisNo
			  ,[EngineNo]=@EngineNo
			  ,[ManufacturerYear]=@ManufacturerYear
			  ,[LoadCarryingCapacity]=@LoadCarryingCapacity
			  ,[MakeOfVehicle]=@MakeOfVehicle
			  ,[ModelNo]=@ModelNo
			  ,[BodyType]=@BodyType
			  ,[OrganizationName]=@OrganizationName
			  ,[DeviceID]=@DeviceID
			WHERE [UserID]=@UserID

		Select 2 RETURNCODE
		END
	  END
END

GO
/****** Object:  StoredProcedure [dbo].[Usp_GetUserVehicleInfo]    Script Date: 17-12-2021 06:08:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Usp_GetUserVehicleInfo]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM [dbo].[UserMst] T1
	LEFT JOIN [dbo].[VehicleTbl] T2 ON T1.[UserID]=T2.[UserID]
  
END

GO
/****** Object:  StoredProcedure [dbo].[Usp_GetVehicleNoCheck]    Script Date: 17-12-2021 06:08:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[Usp_GetVehicleNoCheck]
@VehicleNo varchar(50)
AS
BEGIN

	SELECT count(*) RETURNCODE FROM [dbo].[UserMst] T1
	LEFT JOIN [dbo].[VehicleTbl] T2 ON T1.[UserID]=T2.[UserID] where VehicleNo=@VehicleNo
END


